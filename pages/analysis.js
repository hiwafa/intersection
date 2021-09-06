import react, { useState } from "react"
import GoogleMapReact from 'google-map-react';
import DescriptiveStatistics from "../components/descriptiveStatistics"
import CrashData from "../components/crashData"
import IntersectionInventory from "../components/intersectionInverntory"
import { Form, Row, Col, Input, Tabs, Select, Button, DatePicker } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;

import dynamic from "next/dynamic";


function Analysis() {
    const [showMapContainer, setShowMapContainer] = useState(false)
    const [form] = Form.useForm();
    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };
    function callback(key) {
        console.log(key);
    }
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        setShowMapContainer(true)
    };


    const MapBox = dynamic(() => import("../src/components/MapBox"), {
        loading: () => "Loading...",
        ssr: false
    });

    return <MapBox />;

    return <div style={{ width: "inherit", height: "100%" }}>
        <Col sm={24} md={24} lg={24} style={{ margin: "20px", border: "0.1em solid lightgrey", padding: "5px" }}>
            <Form
                form={form}
                name="formData"
                onFinish={onFinish}>
                <Row gutter={24}>
                    <Col span={8} key={1}>
                        <Form.Item
                            name={`from`}
                            label={`From Date`}
                            rules={[
                                {
                                    required: true,
                                    message: 'This field is required',
                                },
                            ]}
                        >
                            <DatePicker />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={2}>
                        <Form.Item
                            name={`to`}
                            label={`To Date`}
                            rules={[
                                {
                                    required: true,
                                    message: 'This field is required',
                                },
                            ]}
                        >
                            <DatePicker />
                        </Form.Item>
                    </Col>
                    <Col span={8} key={3}>
                        <Form.Item
                            name={`typeOfCrashes`}
                            label={`Type of Crashes`}
                            rules={[{
                                required: true,
                                message: 'This field is required',
                            },]} >
                            <Select>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={4}>
                        <Form.Item
                            name={`collisionType`}
                            label={`Collision Type`} >
                            <Select>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} key={5}>
                        <Form.Item
                            name={`intersectionType`}
                            label={`Intersection Type`} >
                            <Select>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
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
        </Col>
        <Col sm={24} md={24} lg={24} style={{ height: "600px" }}>
            {showMapContainer && <Row gutter={[16]} style={{ height: "inherit" }}>
                <Col lg={12} md={12}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "" }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                    >
                        <div
                            lat={59.955413}
                            lng={30.337844}
                            text="My Marker"
                        />
                    </GoogleMapReact>
                </Col>
                <Col lg={12} md={12}>
                    <div style={{ height: "100%", border: "0.1em solid lightgrey", padding: "5px" }}>
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="Descriptive Statistics" key="1">
                                <DescriptiveStatistics />
                            </TabPane>
                            <TabPane tab="Crash Data" key="2">
                                <CrashData />
                            </TabPane>
                            <TabPane tab="Intersection Inventory" key="3">
                                <IntersectionInventory />
                            </TabPane>
                        </Tabs>
                    </div>
                </Col>
            </Row>}
        </Col>
    </div>
}
export default Analysis