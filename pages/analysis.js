import react, { useMemo, useState, useEffect } from "react";
import CrashData from "../src/components/CrashData";
import Descriptive from "../src/components/Descriptive";
import IntersectionInventory from "../src/components/Intersection";
import TopFilter from "../src/components/TopFilter";
import styles from "../styles/Analys.module.css";
import { Row, Col, Menu, Layout } from 'antd';
import dynamic from "next/dynamic";
const { Content } = Layout;

import { StyledButton } from "../src/components/styleds";
import { useRouter } from "next/router";

const getContent = (tab, inventory) => {

    switch (tab) {
        case "tab1": return <Descriptive inventory={inventory} />;
        case "tab2": return <CrashData inventory={inventory} />;
        case "tab3": return <IntersectionInventory inventory={inventory} />;
        default: return null;
    }

}

function Analys({data}) {

    const { push } = useRouter();
    const [tab, setTab] = useState("tab1");
    const [project, creatProject] = useState(null);
    const [inventory, setInventory] = useState(null);
    const [invntories, setInvntories] = useState([]);

    const MapBox = useMemo(() => dynamic(() => import("../src/components/MapBox"), {
        loading: () => "Loading...",
        ssr: false
    }), []);

    useEffect(() => {
        if (data) setInvntories(data);
    }, [data]);

    const onFilter = (values) => {

        setInventory(null);
        const from = new Date(values.from).getTime();
        const to = new Date(values.to).getTime();

        creatProject({
            ...project,
            id: inventory && inventory.id,
            startDate: from, endDate: to
        });


        if (data) {

            const newInventories = data.filter(i => {

                let check4;
                const check1 = i.INTERSECTION_TYPE === values.intersection;
                const check2 = values.crash === "All" ? true : i.crash_intersections
                    .some(v => `${v.SEVERITY}`.toLowerCase() === `${values.crash}`.toLowerCase());

                const check3 = i.crash_intersections.some(v => `${v.COLLISION_TYPE}`
                    .toLowerCase() === `${values.collision}`.toLowerCase());

                if (values.from && values.to) {

                    check4 = i.crash_intersections.some(v => (new Date(v.DATE_OF_CRASH))
                        .getTime() >= from && (new Date(v.DATE_OF_CRASH)).getTime() <= to);

                } else if (values.from) {

                    check4 = i.crash_intersections.some(v => (new Date(v.DATE_OF_CRASH)).getTime() >= from);

                } else if (values.to) {

                    check4 = i.crash_intersections.some(v => (new Date(v.DATE_OF_CRASH)).getTime() <= to);

                } else {

                    check4 = true;
                }

                const check12 = values.intersection ? check1 : true;
                const check22 = values.crash ? check2 : true;
                const check32 = values.collision ? check3 : true;

                return check12 && check22 && check32 && check4;
            });

            setInvntories(newInventories);
        }
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div style={{ backgroundColor: '#fff', width: '100%' }}>
                <TopFilter onFilter={onFilter} />
            </div>
            <Row className={styles.row}>
                <Col flex={1} md span={12} className={styles.col1}>
                    <MapBox onPress={inventory => {
                        creatProject({
                            ...project,
                            id: inventory.id
                        });
                        setInventory(inventory);
                    }}
                        inventories={invntories} />
                </Col>
                <Col flex={1} md span={12} className={styles.col2}>

                    <Menu theme="light" style={{ backgroundColor: '#f5f5f5' }} mode="horizontal" defaultSelectedKeys={['tab1']}>
                        <Menu.Item key="tab1" onClick={() => setTab("tab1")}>Descriptive Statistics</Menu.Item>
                        <Menu.Item key="tab2" onClick={() => setTab("tab2")}>Crash Data</Menu.Item>
                        <Menu.Item key="tab3" onClick={() => setTab("tab3")}>Intersection Inventory</Menu.Item>
                    </Menu>

                    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 20 }}>
                        <StyledButton onClick={() => {
                            if (inventory && inventory.id && project !== null
                                && project.startDate && project.endDate) {
                                push(`projects/create?project=${JSON.stringify(project)}`);
                            }
                        }}
                            style={{ width: 120, marginBottom: 10 }}>
                            Add to projects
                        </StyledButton>
                        <a style={{ padding: 7, backgroundColor: '#f5f5f5', marginLeft: 10 }}>
                            {inventory && inventory.INTERSECTION_NAME && inventory.INTERSECTION_NAME}
                        </a>
                        <div className="site-layout-background" style={{ minHeight: 380, width: '100%' }}>
                            {getContent(tab, inventory)}
                        </div>
                    </Content>
                </Col>
            </Row>
        </div>
    );
}
export default Analys