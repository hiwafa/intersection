import react from "react";
import { css } from '@emotion/css';
import { Table } from 'antd';


const columns = [
    {
        title: 'Crash NBR',
        dataIndex: 'CRASH_RECORD_NBR',
        key: 'CRASH_RECORD_NBR'
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
        responsive: ['md'],
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
        title: 'Environmental Condition',
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


const tabelStyle = css({
    '& thead > tr > th': {
        backgroundImage: 'linear-gradient(#16A18C, #1393A9)',
        color: 'white',
    }
});

const CrashData = ({ inventory }) => (
    <div style={{ overflow: 'scroll' }}>

        <Table className={tabelStyle} rowKey="id" pagination={{ pageSize: 10 }} columns={columns} dataSource={
            inventory && inventory.crash_intersections ?
                inventory.crash_intersections : []
        } />

    </div>
);

export default CrashData;
