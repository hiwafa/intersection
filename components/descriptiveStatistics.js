import react from "react";
import { Row, Col } from 'antd';
import styles from "../styles/Analys.module.css";

const Descriptive = ({ inventory }) => {
    return (
        <div>
            <Row>
                <Col span={24} className={styles.headCol}>
                    {inventory && inventory.INTERSECTION_NAME ?
                        inventory.INTERSECTION_NAME : 'Intersection Name'}
                </Col>
            </Row>

            <Row>
                <Col span={24} className={styles.headCol}>Severity</Col>
            </Row>
            {inventory && inventory.crash_intersections && inventory.crash_intersections.map(crash => {
                return (
                    <Row key={crash.id}>
                        <Col span={24} className={styles.cell}>
                            {crash.SEVERITY}
                        </Col>
                    </Row>
                );
            })}


            <Row>
                <Col span={24} className={styles.headCol}>Collision Type</Col>
            </Row>
            {inventory && inventory.crash_intersections && inventory.crash_intersections.map(crash => {
                return (
                    <Row key={crash.id}>
                        <Col span={24} className={styles.cell}>
                            {crash.COLLISION_TYPE}
                        </Col>
                    </Row>
                );
            })}


            <Row>
                <Col span={24} className={styles.headCol}>Light Conditions</Col>
            </Row>
            {inventory && inventory.crash_intersections && inventory.crash_intersections.map(crash => {
                return (
                    <Row key={crash.id}>
                        <Col span={24} className={styles.cell}>
                            {crash.LIGHT_CONDITION}
                        </Col>
                    </Row>
                );
            })}

            <Row>
                <Col span={24} className={styles.headCol}>Weather Conditions</Col>
            </Row>
            {inventory && inventory.crash_intersections && inventory.crash_intersections.map(crash => {
                return (
                    <Row key={crash.id}>
                        <Col span={24} className={styles.cell}>
                            {crash.WEATHER_CONDITION}
                        </Col>
                    </Row>
                );
            })}


            <Row>
                <Col span={24} className={styles.headCol}>Road Surface Conditions</Col>
            </Row>
            {inventory && inventory.crash_intersections && inventory.crash_intersections.map(crash => {
                return (
                    <Row key={crash.id}>
                        <Col span={24} className={styles.cell}>
                            {crash.ROAD_SURFACE_CONDITION}
                        </Col>
                    </Row>
                );
            })}

        </div>
    );
}

export default Descriptive;