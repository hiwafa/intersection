import react, { useEffect, useState } from "react";
import { Button, Row, Col, Form, Select, DatePicker, Input, notification } from "antd";
import { ContentContainer, ThemButton } from "../components/styleds";
import { formRequest } from "../requests"
import { LeftCircleOutlined } from '@ant-design/icons';
import { PageTitle } from "./styleds"
import styled from "styled-components";

import { useRouter } from "next/router";
import moment from 'moment';
import 'moment/locale/zh-cn';

import { useGetIntersectionsQuery } from "../store/query";
import { firstCounter, getCalculatedData, numberOfCrashes } from "../utils/calculations";


let params = null;
function CreateProject({ handleClick }) {

    const { query } = useRouter();
    if (query && query.project) {
        params = JSON.parse(query.project);
    }

    const { data: crashCosts } = useGetIntersectionsQuery("Crash-costs");
    const { data: intersections } = useGetIntersectionsQuery("intersection-inventories");

    useEffect(() => {
        return () => {
            params = null;
        };

    }, []);

    const [form] = Form.useForm();

    const onFinish = async (values) => {

        const thisInter = intersections.find(i => i.id === values.INTERSECTION);

        const crashes = numberOfCrashes(
            thisInter.crash_intersections ? thisInter.crash_intersections : [],
            values.CRASH_START_DATE, values.CRASH_END_DATE
        );

        let fCrashCost = crashCosts.find(cos => cos.crashSeverity === "Fatal").crashCost;
        let iCrashCost = crashCosts.find(cos => cos.crashSeverity === "Injury").crashCost;
        let pCrashCost = crashCosts.find(cos => cos.crashSeverity === "PDO").crashCost;

        const { a, b, c, injuries, fatalities, pdo, epdo, crashRate, years } = firstCounter({
            crashes, CRASH_COUNT: crashes.length, AADT: thisInter.AADT,
            CRASH_END_DATE: values.CRASH_END_DATE,
            CRASH_START_DATE: values.CRASH_START_DATE
        });

        const { EUAC, EUAB, BEN_COST } = getCalculatedData({
            injuries, fatalities, pdo, years,
            fCrashCost, iCrashCost, pCrashCost,
            treatments: [], AADT_GROWTH_FACTOR: thisInter.AADT_GROWTH_FACTOR,
        });

        values = {
            ...values,
            CRASH_COUNT: crashes.length,
            EPDO: epdo, EUAB, EUAC, BEN_COST: parseFloat(BEN_COST) ? BEN_COST: 0,
            NUMBER_OF_FATALITIES: fatalities,
            NUMBER_OF_INJURIES: injuries,
            NUMBER_OF_PDO: pdo,
            CRASH_RATE_AADT: crashRate,
            NUMBER_OF_A_INJURIES: a,
            NUMBER_OF_B_INJURIES: b,
            NUMBER_OF_C_INJURIES: c
        };

        console.log("values: ", values);

        await formRequest("projects", {
            method: "POST",
            data: values,
        }).then((res) => {
            if (res.status === 200) {
                notification["success"]({
                    duration: 5,
                    message: "Project created",
                });
                handleClick(true)
            }
        }).catch((e) => {

            notification["error"]({
                duration: 5,
                message: "Project not created",
            });

        });

    };

    const wrapperCol = {
        xs: { span: 24 },
        sm: { span: 24 },
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