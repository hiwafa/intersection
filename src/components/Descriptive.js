import react from "react";
import { Row, Col } from 'antd';
import styles from "../../styles/Analys.module.css";


const getSeverity = arr => {
    const counts = {};
    arr.forEach(x => {
        if(x.SEVERITY){
            counts[x.SEVERITY] = (counts[x.SEVERITY] || 0) + 1;
        }
    });
    
    return Object.entries(counts);
};

const Descriptive = ({ inventory }) => {
    return (
        <div>

            <Row>
                <Col span={8} className={styles.headCol}>Severity</Col>
                <Col span={8} className={styles.headCol}>Number</Col>
                <Col span={8} className={styles.headCol}>Percent</Col>
            </Row>
            {inventory && inventory.crash_intersections && getSeverity(inventory.crash_intersections).map(crash => {
                return (
                    <Row key={crash.id}>
                        <Col span={8} className={styles.cell}>
                            {crash[0]}
                        </Col>
                        <Col span={8} className={styles.cell}>
                            {crash[1]}
                        </Col>
                        <Col span={8} className={styles.cell}>
                            {100/crash[1]}%
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