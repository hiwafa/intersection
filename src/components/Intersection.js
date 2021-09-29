import react from "react";
import { Table } from 'antd';
import { css } from '@emotion/css';

const toRender = text => <a>{text}</a>;

const columns = [
    {
        title: 'Intersection Type',
        dataIndex: 'INTERSECTION_TYPE',
        key: 'INTERSECTION_TYPE',
        render: toRender,
        responsive: ['md']
    },
    {
        title: 'Number of Approach',
        dataIndex: 'NUMBER_OF_APPRAOCHES',
        key: 'NUMBER_OF_APPRAOCHES',
        responsive: ['md']
    },
    {
        title: 'AADT',
        dataIndex: 'AADT',
        key: 'AADT',
        responsive: ['md']
    },
    {
        title: 'AADT Growth Factor',
        dataIndex: 'AADT_GROWTH_FACTOR',
        key: 'AADT_GROWTH_FACTOR',
        responsive: ['md']
    }
];

const tabelStyle = css({
    '& thead > tr > th': {
        backgroundImage: 'linear-gradient(#16A18C, #1393A9)',
        color: 'white',
    }
});

const IntersectionInventory = ({ inventory }) => (
    <div style={{ overflow: 'scroll' }}>

        <Table className={tabelStyle} rowKey="id" pagination={{ pageSize: 10 }} columns={columns} dataSource={
            inventory ? [inventory] : []
        } />

    </div>
);
export default IntersectionInventory;