import react, { useMemo, useState } from "react"
import GoogleMapReact from 'google-map-react';
import DescriptiveStatistics from "../components/descriptiveStatistics"
import CrashData from "../components/crashData"
import IntersectionInventory from "../components/intersectionInverntory";

import { Row, Col, Menu, Layout } from 'antd';
const { Content } = Layout;

import styles from "../styles/Analys.module.css";
import dynamic from "next/dynamic";


const Descriptive = ({ inventory }) => {

    return (
        <div>

            <Row>
                <Col span={24} style={{
                    backgroundColor: '#f2f2f2',
                    textAlign: 'center'
                }}>{inventory && inventory.INTERSECTION_NAME ? inventory.INTERSECTION_NAME : 'Intersection Name'}</Col>
            </Row>

            <Row style={{
                backgroundColor: '#f9f9f9'
            }}>
                <Col span={8}>Description</Col>
                <Col span={8}>Crashes</Col>
                <Col span={8}>Percent</Col>
            </Row>

            <Row>
                <Col span={24} style={{
                    backgroundColor: '#f2f2f2',
                    textAlign: 'center',
                    height: 30,
                    paddingTop: 5,
                    fontWeight: 'bold'
                }}>Severity</Col>
            </Row>
            {inventory && inventory.crash_intersections && inventory.crash_intersections.map(crash => {
                return (
                    <Row>
                        <Col span={24} style={{
                            paddingLeft: 10,
                            backgroundColor: '#f9f9f9',
                            borderBottom: '1px solid lightgray'
                        }}>{crash.SEVERITY}</Col>
                    </Row>
                );
            })}


            <Row>
                <Col span={24} style={{
                    backgroundColor: '#f2f2f2',
                    textAlign: 'center',
                    height: 30,
                    paddingTop: 5,
                    fontWeight: 'bold'
                }}>Collision Type</Col>
            </Row>
            {inventory && inventory.crash_intersections && inventory.crash_intersections.map(crash => {
                return (
                    <Row>
                        <Col span={24} style={{
                            paddingLeft: 10,
                            backgroundColor: '#f9f9f9',
                            borderBottom: '1px solid lightgray'
                        }}>{crash.COLLISION_TYPE}</Col>
                    </Row>
                );
            })}
            
            
            <Row>
                <Col span={24} style={{
                    backgroundColor: '#f2f2f2',
                    textAlign: 'center',
                    height: 30,
                    paddingTop: 5,
                    fontWeight: 'bold'
                }}>Light Conditions</Col>
            </Row>
            {inventory && inventory.crash_intersections && inventory.crash_intersections.map(crash => {
                return (
                    <Row>
                        <Col span={24} style={{
                            paddingLeft: 10,
                            backgroundColor: '#f9f9f9',
                            borderBottom: '1px solid lightgray'
                        }}>{crash.LIGHT_CONDITION}</Col>
                    </Row>
                );
            })}
            
            <Row>
                <Col span={24} style={{
                    backgroundColor: '#f2f2f2',
                    textAlign: 'center',
                    height: 30,
                    paddingTop: 5,
                    fontWeight: 'bold'
                }}>Weather Conditions</Col>
            </Row>
            {inventory && inventory.crash_intersections && inventory.crash_intersections.map(crash => {
                return (
                    <Row>
                        <Col span={24} style={{
                            paddingLeft: 10,
                            backgroundColor: '#f9f9f9',
                            borderBottom: '1px solid lightgray'
                        }}>{crash.WEATHER_CONDITION}</Col>
                    </Row>
                );
            })}
            
            
            <Row>
                <Col span={24} style={{
                    backgroundColor: '#f2f2f2',
                    textAlign: 'center',
                    height: 30,
                    paddingTop: 5,
                    fontWeight: 'bold'
                }}>Road Surface Conditions</Col>
            </Row>
            {inventory && inventory.crash_intersections && inventory.crash_intersections.map(crash => {
                return (
                    <Row>
                        <Col span={24} style={{
                            paddingLeft: 10,
                            backgroundColor: '#f9f9f9',
                            borderBottom: '1px solid lightgray'
                        }}>{crash.ROAD_SURFACE_CONDITION}</Col>
                    </Row>
                );
            })}


        </div>
    );
}

const getContent = (tab, inventory) => {

    switch (tab) {
        case "tab1": return <Descriptive inventory={inventory} />;
        case "tab2": return <div>content 2</div>;
        case "tab3": return <div>content 3</div>;
        default: return null;
    }

}

function Analysis() {

    const [tab, setTab] = useState("tab1");
    const [inventory, setInventory] = useState(null);

    const MapBox = useMemo(() => dynamic(() => import("../src/components/MapBox"), {
        loading: () => "Loading...",
        ssr: false
    }), []);

    return (
        <Row className={styles.row}>
            <Col flex={1} md span={12} className={styles.col1}>
                <MapBox onPress={inventory => setInventory(inventory)} />
            </Col>
            <Col flex={1} md span={12} className={styles.col2}>
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['tab1']}>
                    <Menu.Item key="tab1" onClick={() => setTab("tab1")}>Descriptive Statistics</Menu.Item>
                    <Menu.Item key="tab2" onClick={() => setTab("tab2")}>Crash Data</Menu.Item>
                    <Menu.Item key="tab3" onClick={() => setTab("tab3")}>Intersection Inventory</Menu.Item>
                </Menu>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ minHeight: 380 }}>
                        {getContent(tab, inventory)}
                    </div>
                </Content>
            </Col>
        </Row>
    );
}
export default Analysis