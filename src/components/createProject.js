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

const firstCounter = ({
    crashes, CRASH_COUNT, AADT,
    CRASH_END_DATE, CRASH_START_DATE
}) => {

    let a = 0, b = 0, c = 0, pdo = 0, epdo = 0,
        injuries = 0, fatalities = 0, crashRate = 0;

    if (!(CRASH_END_DATE && CRASH_START_DATE)) return false;

    let endDate = moment(CRASH_END_DATE);
    let startDate = moment(CRASH_START_DATE);
    let years = (endDate.diff(startDate, "days") / 365).toFixed(5);

    crashes && crashes.forEach(crash => {
        a += parseInt(crash.NUMBER_OF_A_INJURIES);
        b += parseInt(crash.NUMBER_OF_B_INJURIES);
        c += parseInt(crash.NUMBER_OF_C_INJURIES);
        injuries += parseInt(crash.NUMBER_OF_INJURIES);
        fatalities += parseInt(crash.NUMBER_OF_FATALITIES);
        pdo += parseInt(crash.NUMBER_OF_PDO);
    });

    crashRate = (CRASH_COUNT * 1000000) / (years * 365 * AADT);

    epdo = 542 * fatalities + 11 * injuries + 1 * pdo;

    return { a, b, c, injuries, fatalities, pdo, epdo, crashRate, years };
};

const getCalculatedData = ({
    treatments, AADT_GROWTH_FACTOR,
    fCrashCost, iCrashCost, pCrashCost,
    injuries, fatalities, pdo, years,
}) => {

    let crf = 1, EUAC = 0.0, EUAB = 0.0;
    treatments && treatments.forEach(treat => {
        let i = parseFloat(treat.INTEREST_RATE),
            Cest = parseFloat(treat.TOTAL_TREATMENT_COST),
            Sper = parseFloat(treat.SALVAGE_PERCENT),
            l = parseInt(treat.SERVICE_LIFE),

            cr = (i * Math.pow((1 + i), l)) / (Math.pow((1 + i), l) - 1),
            sf = i / (Math.pow((1 + i), l) - 1),
            sv = Cest * Sper;

        EUAC += (Cest * cr) - (sv * sf);
        crf *= (1 - parseFloat(treat.CRF));
    });

    crf = 1 - crf;
    let aADT = Math.pow((1 + AADT_GROWTH_FACTOR / 100), years);
    crf = aADT * crf;

    let crbF = fatalities * crf;
    let crbI = injuries * crf;
    let crbP = pdo * crf;

    let ccF = crbF * fCrashCost;
    let ccI = crbI * iCrashCost;
    let ccP = crbP * pCrashCost;

    EUAB = ((ccF + ccI + ccP) / years);

    const BEN_COST = (EUAB / EUAC).toFixed(3);

    EUAC = EUAC.toFixed(3);

    return { EUAC, EUAB, BEN_COST }
}


let params = null;
function CreateProject({ handleClick }) {

    const { query } = useRouter();
    if (query && query.project) {
        params = JSON.parse(query.project);
    }

    const { data: treatments } = useGetIntersectionsQuery("treatments");
    const { data: crashCosts } = useGetIntersectionsQuery("Crash-costs");
    const { data: intersections } = useGetIntersectionsQuery("intersection-inventories");

    useEffect(() => {
        return () => {
            params = null;
        };

    }, []);

    const [form] = Form.useForm();

    const numberOfCrashes = (thisInter, frm, tu) => {

        const from = new Date(frm).getTime();
        const to = new Date(tu).getTime();

        return (thisInter.crash_intersections)
            .filter(c => (new Date(c.DATE_OF_CRASH)).getTime() >=
                from && (new Date(c.DATE_OF_CRASH)).getTime() <= to);

    }

    const onFinish = async (values) => {

        const thisInter = intersections.find(i => i.id === values.INTERSECTION);

        const crashes = numberOfCrashes(
            thisInter, values.CRASH_START_DATE, values.CRASH_END_DATE
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
            treatments, AADT_GROWTH_FACTOR: thisInter.AADT_GROWTH_FACTOR,
        });

        values = {
            ...values,
            CRASH_COUNT: crashes.length,
            EPDO: epdo, EUAB, EUAC, BEN_COST,
            NUMBER_OF_FATALITIES: fatalities,
            NUMBER_OF_INJURIES: injuries,
            NUMBER_OF_PDO: pdo,
            CRASH_RATE_AADT: crashRate,
            NUMBER_OF_A_INJURIES: a,
            NUMBER_OF_B_INJURIES: b,
            NUMBER_OF_C_INJURIES: c
        };

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
        let crashLength = 0;
        intersections.length > 0 && intersections.map((intersection) => {
            if (intersection.id == id) {
                crashLength = intersection?.crash_intersections?.length;
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