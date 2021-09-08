import react from "react";
import { Row, Col, Typography } from 'antd';
import styles from "../../styles/Analys.module.css";

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
                {inventory.INTERSECTION_NAME}
            </Col>
            <Col span={18} >
                {inventory && inventory.crash_intersections && inventory.crash_intersections.map(crash => {
                    return (
                        <Row key={crash.id}>
                            <Col span={8} className={styles.cell}>
                                <Typography.Text ellipsis={true}>
                                    {crash.CRASH_RECORD_NBR}
                                </Typography.Text>
                            </Col>
                            <Col span={8} className={styles.cell}>
                                <Typography.Text ellipsis={true}>
                                    {crash.DATE_OF_CRASH}
                                </Typography.Text>
                            </Col>
                            <Col span={8} className={styles.cell}>
                                <Typography.Text ellipsis={true}>
                                    {crash.COLLISION_TYPE}
                                </Typography.Text>
                            </Col>
                        </Row>
                    );
                })}
            </Col>
        </Row>

    </div>
);

export default CrashData;
