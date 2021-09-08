import react, { useMemo, useState, useEffect } from "react";
import CrashData from "../src/components/CrashData";
import Descriptive from "../src/components/Descriptive";
import IntersectionInventory from "../src/components/Intersection";
import { useGetIntersectionsQuery } from "../src/store/query";
import TopFilter from "../src/components/TopFilter";
import styles from "../styles/Analys.module.css";
import { Row, Col, Menu, Layout } from 'antd';
import dynamic from "next/dynamic";
const { Content } = Layout;


const getContent = (tab, inventory) => {

    switch (tab) {
        case "tab1": return <Descriptive inventory={inventory} />;
        case "tab2": return <CrashData inventory={inventory} />;
        case "tab3": return <IntersectionInventory inventory={inventory} />;
        default: return null;
    }

}

function Analysis() {

    const [tab, setTab] = useState("tab1");
    const [inventory, setInventory] = useState(null);
    const [invntories, setInvntories] = useState([]);
    const {data} = useGetIntersectionsQuery("intersection-inventories");

    const MapBox = useMemo(() => dynamic(() => import("../src/components/MapBox"), {
        loading: () => "Loading...",
        ssr: false
    }), []);

    useEffect(()=>{
        if(data) setInvntories(data);
    }, [data]);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div style={{ backgroundColor: '#fff', width: '100%' }}>
                <TopFilter inventories={data} />
            </div>
            <Row className={styles.row}>
                <Col flex={1} md span={12} className={styles.col1}>
                    <MapBox onPress={inventory => setInventory(inventory)}
                        inventories={data} />
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
        </div>
    );
}
export default Analysis