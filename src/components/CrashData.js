import react from "react";
import { Row, Col, Typography } from 'antd';
import styles from "../../styles/Analys.module.css";
import { Table } from 'antd';


const columns = [
    {
        title: 'Crash NBR',
        dataIndex: 'CRASH_RECORD_NBR',
        key: 'CRASH_RECORD_NBR',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Crash Date',
        dataIndex: 'DATE_OF_CRASH',
        key: 'DATE_OF_CRASH',
        responsive: ['md'],
    },
    {
        title: 'Crash Time',
        dataIndex: 'TIME_OF_CRASH',
        key: 'TIME_OF_CRASH',
        responsive: ['md'],
    },
    {
        title: 'Collision Type',
        dataIndex: 'COLLISION_TYPE',
        key: 'COLLISION_TYPE',
        responsive: ['lg'],
    },
    {
        title: 'County',
        dataIndex: 'COUNTY',
        key: 'COUNTY',
        responsive: ['md'],
    },
    {
        title: 'Severity',
        dataIndex: 'SEVERITY',
        key: 'SEVERITY',
        responsive: ['md'],
    },
    {
        title: 'District',
        dataIndex: 'DISTRICT',
        key: 'DISTRICT',
        responsive: ['md'],
    },
    {
        title: 'ENVI Condition',
        dataIndex: 'ENVI_CONDITION',
        key: 'ENVI_CONDITION',
        responsive: ['md'],
    },
    {
        title: 'Highway Class',
        dataIndex: 'HIGHWAY_CLASS',
        key: 'HIGHWAY_CLASS',
        responsive: ['md'],
    },
    {
        title: 'Latitude',
        dataIndex: 'LATITUDE',
        key: 'LATITUDE',
        responsive: ['md'],
    },
    {
        title: 'Longitude',
        dataIndex: 'LONGITUD',
        key: 'LONGITUD',
        responsive: ['md'],
    },
    {
        title: 'Light Condition',
        dataIndex: 'LIGHT_CONDITION',
        key: 'LIGHT_CONDITION',
        responsive: ['md'],
    },
    {
        title: 'Number Of Injuries',
        dataIndex: 'NUMBER_OF_INJURIES',
        key: 'NUMBER_OF_INJURIES',
        responsive: ['md'],
    },
    {
        title: 'Number Of A Injuries',
        dataIndex: 'NUMBER_OF_A_INJURIES',
        key: 'NUMBER_OF_A_INJURIES',
        responsive: ['md'],
    },
    {
        title: 'Number Of B Injuries',
        dataIndex: 'NUMBER_OF_B_INJURIES',
        key: 'NUMBER_OF_B_INJURIES',
        responsive: ['md'],
    },
    {
        title: 'Number Of C Injuries',
        dataIndex: 'NUMBER_OF_C_INJURIES',
        key: 'NUMBER_OF_C_INJURIES',
        responsive: ['md'],
    },
    {
        title: 'Number Of Fatalities',
        dataIndex: 'NUMBER_OF_FATALITIES',
        key: 'NUMBER_OF_FATALITIES',
        responsive: ['md'],
    },
    {
        title: 'Number Of PDO',
        dataIndex: 'NUMBER_OF_PDO',
        key: 'NUMBER_OF_PDO',
        responsive: ['md'],
    },
    {
        title: 'Road Surface Condition',
        dataIndex: 'ROAD_SURFACE_CONDITION',
        key: 'ROAD_SURFACE_CONDITION',
        responsive: ['md'],
    },
    {
        title: 'Road Surface Type',
        dataIndex: 'ROAD_SURFACE_TYPE',
        key: 'ROAD_SURFACE_TYPE',
        responsive: ['md'],
    },
    {
        title: 'Weather Condition',
        dataIndex: 'WEATHER_CONDITION',
        key: 'WEATHER_CONDITION',
        responsive: ['md'],
    },
];

const CrashData = ({ inventory }) => (
    <div>

        <Row className={styles.row}>
            <Col span={6} className={styles.headCol}> Intersection</Col>
            <Col span={6} className={styles.headCol}>CrashRN</Col>
            <Col span={6} className={styles.headCol}>CrashDate</Col>
            <Col span={6} className={styles.headCol}>Collision</Col>
        </Row>

        <Row className={styles.row}>
            <Col span={6} style={{ fontWeight: 'bold', textAlign: 'center', alignSelf: 'center' }}>
                {inventory && inventory.INTERSECTION_NAME}
            </Col>
            <Col span={18} >
                <Table columns={columns} dataSource={
                    inventory && inventory.crash_intersections ?
                    inventory.crash_intersections : []
                } />
            </Col>
        </Row>

    </div>
);

export default CrashData;
