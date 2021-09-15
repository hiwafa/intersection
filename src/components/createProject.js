import react, { useEffect, useState } from "react";
import { Button, Row, Col, Form, Select, DatePicker, Input, message } from "antd"
import { request } from "../requests"
import { LeftCircleOutlined } from '@ant-design/icons';
import { PageTitle } from "./styleds"
import styled from "styled-components";

import { useRouter } from "next/router";
import moment from 'moment';
import 'moment/locale/zh-cn';


const FormContainer = styled.div`
    margin-right: 10%;
    margin-left: 10%;
    margin-top: 20px;
    background: white;
    padding: 10px;
`;

let params = null;
function CreateProject({ handleClick }) {

    const { query } = useRouter();
    if(query && query.project){
        params = JSON.parse(query.project);
    }

    

    const [intersections, setIntersections] = useState({})
    const loadIntersections = async () => {
        const res = await request("/intersection-inventories", {
            method: "GET",
        });
        if (res.status === 200) {
            setIntersections(res.data)
        }
    }
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        await request("projects", {
            method: "POST",
            data: values,
        }).then((res) => {
            if (res.status === 200) {
                message.success("Project created")
            }
        }).catch((e) => {
            message.error("Project not created")
        });
    };
    const wrapperCol = {
        xs: { span: 24 },
        sm: { span: 24 },
    }
    useEffect(() => {

        loadIntersections();
        return ()=> {
            params = null;
        };

    }, [])
    console.log(intersections)
    return <>
        <PageTitle> <LeftCircleOutlined className={"backButton"} onClick={() => handleClick(true)} /> Create Project</PageTitle>
        <FormContainer>
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

                            <Select size={"large"} showSearch
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
                            <DatePicker size={"large"} style={{ width: "100%" }} />
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
                            <DatePicker size={"large"} style={{ width: "100%" }} />
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
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    </>
}
export default CreateProject;