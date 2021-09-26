import react, { useEffect, useState } from "react";
import { Button, Row, Col, Form, Select, DatePicker, Input, notification } from "antd"
import { formRequest } from "../requests"
import { LeftCircleOutlined } from '@ant-design/icons';
import { PageTitle } from "./styleds"
import styled from "styled-components";

import { useRouter } from "next/router";
import moment from 'moment';
import 'moment/locale/zh-cn';
import {ContentContainer, ThemButton} from "../components/styleds"



let params = null;
function CreateProject({ handleClick }) {

    const { query } = useRouter();
    if(query && query.project){
        params = JSON.parse(query.project);
    }

    const [intersections, setIntersections] = useState({});

    useEffect(() => {

        loadIntersections();
        return ()=> {
            params = null;
        };

    }, []);
    
    const loadIntersections = async () => {
        const res = await formRequest("/intersection-inventories", {
            method: "GET",
        });
        if (res.status === 200) {
            setIntersections(res.data)
        }
    }

    const [form] = Form.useForm();

    const numberOfCrashes = (id, frm, tu)=> {
       
        const from = new Date(frm).getTime();
        const to = new Date(tu).getTime();

        return (intersections.find(i => i.id === id).crash_intersections)
        .filter(c => (new Date(c.DATE_OF_CRASH)).getTime() >=
        from && (new Date(c.DATE_OF_CRASH)).getTime() <= to).length;

    }

    const onFinish = async (values) => {

        values = {
            ...values,
            CRASH_COUNT: numberOfCrashes(
                values.INTERSECTION,
                values.CRASH_START_DATE,
                values.CRASH_END_DATE,
            )
        }

        await formRequest("projects", {
            method: "POST",
            data: values,
        }).then((res) => {
            if (res.status === 200) {
                notification["success"]({
                    duration: 5,
                    message: "Project created",
                  })
                  handleClick(true)
            }
        }).catch((e) => {
            notification["error"]({
                duration: 5,
                message: "Project not created",
              })
        });

    };

    const wrapperCol = {
        xs: { span: 24 },
        sm: { span: 24 },
    }

    const selectIntersection = (id) => {
        let crashLength =0;
        intersections.length >0 && intersections.map((intersection) =>{
            if(intersection.id == id)
            {
                crashLength= intersection?.crash_intersections?.length;
            }
        })
        return crashLength;
    }

    return <>
        <PageTitle> <LeftCircleOutlined className={"backButton"} onClick={() => handleClick(true)} /> Create Project</PageTitle>
        <ContentContainer>
            <Form
                form={form}
                labelCol={{ span: 24 }}
                wrapperCol={wrapperCol}
                name="formData"
                onFinish={onFinish}>
                <Row gutter={24}>
                    <Col xs={24} sm={12} md={8} lg={6} key={1}>
                        <Form.Item
                            name={`PROJECT_NAME`}
                            label={`Project Name`}
                            rules={[
                                {
                                    required: true,
                                    message: 'This field is required',
                                },
                            ]}>
                            <Input size={"large"} id="warning2" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} key={2}>
                        <Form.Item
                            name={`INTERSECTION`}
                            label={`Intersection`}
                            initialValue={params && params.id}
                            rules={[{
                                required: true,
                                message: 'This field is required',
                            },]} >

                            <Select disabled={params && params.id} size={"large"} showSearch
                                optionFilterProp="children"
                                defaultActiveFirstOption={true}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                {intersections.length && intersections.map((intersection, index) => {
                                    return <Select.Option key={intersection.id} value={intersection.id}>{intersection.INTERSECTION_NAME}</Select.Option>

                                })}

                            </Select>

                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} key={7}>
                        <Form.Item
                            name={`CRASH_START_DATE`}
                            label={`Crash Start Date`}
                            initialValue={params && moment(new Date(parseInt(params.startDate)), 'YYYY-MM-DD')}
                            rules={[
                                {
                                    required: true,
                                    message: 'This field is required',
                                },
                            ]}
                        >
                            <DatePicker disabled={params && params.id} size={"large"} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} key={8}>
                        <Form.Item
                            name={`CRASH_END_DATE`}
                            label={`Crash End Date`}
                            initialValue={params && moment(new Date(parseInt(params.endDate)), 'YYYY-MM-DD')}
                            rules={[
                                {
                                    required: true,
                                    message: 'This field is required',
                                },
                            ]}
                        >
                            <DatePicker disabled={params && params.id} size={"large"} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} key={10}>
                        <Form.Item
                            name={`PROJECT_START_DATE`}
                            label={`Project Start Date`}
                        >
                            <DatePicker size={"large"} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} key={11}>
                        <Form.Item
                            name={`PROJECT_END_DATE`}
                            label={`Project End Date`}
                        >
                            <DatePicker size={"large"} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} key={12}>
                        <Form.Item
                            name={`PROGRAM_NAME`}
                            label={`Program Name`} >
                            <Input size={"large"} id="warning2" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} key={14}>
                        <Form.Item
                            name={`PROGRAM_NUMBER`}
                            label={`Program Number`} >
                            <Input size={"large"} id="warning2" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <ThemButton htmlType="submit" block={false}>
                            Submit
                        </ThemButton>
                    </Col>
                </Row>
            </Form>
        </ContentContainer>
    </>
}
export default CreateProject;