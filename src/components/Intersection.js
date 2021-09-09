import react from "react";
import { Row, Col, Typography } from 'antd';
import styles from "../../styles/Analys.module.css";

const IntersectionInventory = ({ inventory }) => (
    <div>

        <Row className={styles.row}>
            <Col span={6} className={styles.headCol}> Intersection</Col>
            <Col span={6} className={styles.headCol}>Intersection Type</Col>
            <Col span={6} className={styles.headCol}>No. of Approaches</Col>
            <Col span={6} className={styles.headCol}>AADT</Col>
        </Row>

        <Row className={styles.row}>
            <Col span={6} className={styles.cell} style={{ fontWeight: 'bold' }}>
                {inventory && inventory.INTERSECTION_NAME}
            </Col>
            <Col span={6} className={styles.cell}>
                <Typography.Text ellipsis={true}>
                    {inventory && inventory.INTERSECTION_TYPE}
                </Typography.Text>
            </Col>
            <Col span={6} className={styles.cell}>
                <Typography.Text ellipsis={true}>
                    {inventory && inventory.NUMBER_OF_APPRAOCHES}
                </Typography.Text>
            </Col>
            <Col span={6} className={styles.cell}>
                <Typography.Text ellipsis={true}>
                    {inventory && inventory.AADT}
                </Typography.Text>
            </Col>
        </Row>

    </div>
);
export default IntersectionInventory;