import react, { useState } from "react"
import GoogleMapReact from 'google-map-react';
import DescriptiveStatistics from "../components/descriptiveStatistics"
import CrashData from "../components/crashData"
import IntersectionInventory from "../components/intersectionInverntory";

import { Row, Col, Menu, Layout } from 'antd';
const { Content } = Layout;

import styles from "../styles/Analys.module.css";
import dynamic from "next/dynamic";


const getContent = tab => {

    switch (tab) {
        case "tab1": return <div>content 1</div>;
        case "tab2": return <div>content 2</div>;
        case "tab3": return <div>content 3</div>;
        default: return null;
    }

}

function Analysis() {

    const [tab, setTab] = useState("tab1");

    const MapBox = dynamic(() => import("../src/components/MapBox"), {
        loading: () => "Loading...",
        ssr: false
    });

    return (
        <Row className={styles.row}>
            <Col flex={1} md span={12} className={styles.col1}>
                <MapBox />
            </Col>
            <Col flex={1} md span={12} className={styles.col2}>
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['tab1']}>
                    <Menu.Item key="tab1" onClick={() => setTab("tab1")}>Descriptive Statistics</Menu.Item>
                    <Menu.Item key="tab2" onClick={() => setTab("tab2")}>Crash Data</Menu.Item>
                    <Menu.Item key="tab3" onClick={() => setTab("tab3")}>Intersection Inventory</Menu.Item>
                </Menu>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ minHeight: 380 }}>
                        {getContent(tab)}
                    </div>
                </Content>
            </Col>
        </Row>
    );
}
export default Analysis