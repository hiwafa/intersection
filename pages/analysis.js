import react, { useState } from "react"
import GoogleMapReact from 'google-map-react';
import DescriptiveStatistics from "../components/descriptiveStatistics"
import CrashData from "../components/crashData"
import IntersectionInventory from "../components/intersectionInverntory";

import { Row, Col } from 'antd';

import styles from "../styles/Analys.module.css";
import dynamic from "next/dynamic";



function Analysis() {

    const MapBox = dynamic(() => import("../src/components/MapBox"), {
        loading: () => "Loading...",
        ssr: false
    });

    return (
        <Row className={styles.row}>
            <Col flex={1} md span={12} className={styles.col1}>
                <MapBox />
            </Col>
            <Col flex={1} md span={12} className={styles.col2}>col-12</Col>
        </Row>
    );
}
export default Analysis