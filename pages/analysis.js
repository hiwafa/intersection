import react, { useMemo, useState } from "react"
import GoogleMapReact from 'google-map-react';
import Descriptive from "../components/descriptiveStatistics"
import CrashData from "../components/crashData"
import IntersectionInventory from "../components/intersectionInverntory";

import { Row, Col, Menu, Layout, Typography } from 'antd';
const { Content } = Layout;

import styles from "../styles/Analys.module.css";
import dynamic from "next/dynamic";


const MIRE = ({ inventory }) => {

    return (
        <div>

            <Row className={styles.row}>
                <Col span={6} className={styles.headCol}> Intersection</Col>
                <Col span={6} className={styles.headCol}>Intersection Type</Col>
                <Col span={6} className={styles.headCol}>No. of Approaches</Col>
                <Col span={6} className={styles.headCol}>AADT</Col>
            </Row>

            <Row className={styles.row}>
                <Col span={6} className={styles.cell} style={{ fontWeight: 'bold' }}>
                    {inventory.INTERSECTION_NAME}
                </Col>
                <Col span={6} className={styles.cell}>
                    <Typography.Text ellipsis={true}>
                        {inventory.INTERSECTION_TYPE}
                    </Typography.Text>
                </Col>
                <Col span={6} className={styles.cell}>
                    <Typography.Text ellipsis={true}>
                        {inventory.NUMBER_OF_APPRAOCHES}
                    </Typography.Text>
                </Col>
                <Col span={6} className={styles.cell}>
                    <Typography.Text ellipsis={true}>
                        {inventory.AADT}
                    </Typography.Text>
                </Col>
            </Row>

        </div>
    );
}

const getContent = (tab, inventory) => {

    switch (tab) {
        case "tab1": return <Descriptive inventory={inventory} />;
        case "tab2": return <CrashData inventory={inventory} />;
        case "tab3": return <MIRE inventory={inventory} />;
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