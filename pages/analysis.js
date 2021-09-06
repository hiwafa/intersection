import react, { useState } from "react"
import GoogleMapReact from 'google-map-react';
import DescriptiveStatistics from "../components/descriptiveStatistics"
import CrashData from "../components/crashData"
import IntersectionInventory from "../components/intersectionInverntory"
import { Form, Row, Col, Input, Tabs, Select, Button, DatePicker } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import styles from "../styles/Analys.module.css";

const { TabPane } = Tabs;

import dynamic from "next/dynamic";


function Analysis() {

    const MapBox = dynamic(() => import("../src/components/MapBox"), {
        loading: () => "Loading...",
        ssr: false
    });

    return (
        <div className={styles.container}>
            <div className="column1 box"></div>
        </div>
    );
}
export default Analysis