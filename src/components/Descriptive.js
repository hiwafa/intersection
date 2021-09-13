import react from "react";
import { Row, Col } from 'antd';
import styles from "../../styles/Analys.module.css";


const getSeverity = arr => {
    const counts = {};
    arr.forEach(x => {
        if (x.SEVERITY) {
            counts[x.SEVERITY] = (counts[x.SEVERITY] || 0) + 1;
        }
    });

    return Object.entries(counts);
};

const getCollisionType = arr => {
    const counts = {};
    arr.forEach(x => {
        if (x.COLLISION_TYPE) {
            counts[x.COLLISION_TYPE] = (counts[x.COLLISION_TYPE] || 0) + 1;
        }
    });

    return Object.entries(counts);
};

const getLightCondition = arr => {
    const counts = {};
    arr.forEach(x => {
        if (x.LIGHT_CONDITION) {
            counts[x.LIGHT_CONDITION] = (counts[x.LIGHT_CONDITION] || 0) + 1;
        }
    });

    return Object.entries(counts);
};

const getWeatherCondition = arr => {
    const counts = {};
    arr.forEach(x => {
        if (x.WEATHER_CONDITION) {
            counts[x.WEATHER_CONDITION] = (counts[x.WEATHER_CONDITION] || 0) + 1;
        }
    });

    return Object.entries(counts);
};

const getRoadSurfaceCondition = arr => {
    const counts = {};
    arr.forEach(x => {
        if (x.ROAD_SURFACE_CONDITION) {
            counts[x.ROAD_SURFACE_CONDITION] = (counts[x.ROAD_SURFACE_CONDITION] || 0) + 1;
        }
    });

    return Object.entries(counts);
};

const Descriptive = ({ inventory }) => {

    return (
        <div>

            <Row>
                <Col span={12} className={styles.headCol}>Name</Col>
                <Col span={6} className={styles.headCol}>Number</Col>
                <Col span={6} className={styles.headCol}>Percent</Col>
            </Row>

            <Row>
                <Col span={24} style={{ fontWeight: 'bold', padding: 5, backgroundColor: '#eee' }}>Severity</Col>
            </Row>
            {inventory && inventory.crash_intersections && getSeverity(inventory.crash_intersections).map(crash => {
                return (
                    <Row key={crash[0]}>
                        <Col span={12} className={styles.cell}>
                            {crash[0]}
                        </Col>
                        <Col span={6} className={styles.cell}>
                            {crash[1]}
                        </Col>
                        <Col span={6} className={styles.cell}>
                            {100 / crash[1]}%
                        </Col>
                    </Row>
                );
            })}


            <Row>
                <Col span={24} style={{ fontWeight: 'bold', padding: 5, backgroundColor: '#eee' }}>Collision Type</Col>
            </Row>
            {inventory && inventory.crash_intersections && getCollisionType(inventory.crash_intersections).map(crash => {
                return (
                    <Row key={crash[0]}>
                        <Col span={12} className={styles.cell}>
                            {crash[0]}
                        </Col>
                        <Col span={6} className={styles.cell}>
                            {crash[1]}
                        </Col>
                        <Col span={6} className={styles.cell}>
                            {100 / crash[1]}%
                        </Col>
                    </Row>
                );
            })}


            <Row>
                <Col span={24} style={{ fontWeight: 'bold', padding: 5, backgroundColor: '#eee' }}>Light Conditions</Col>
            </Row>
            {inventory && inventory.crash_intersections && getLightCondition(inventory.crash_intersections).map(crash => {
                return (
                    <Row key={crash[0]}>
                        <Col span={12} className={styles.cell}>
                            {crash[0]}
                        </Col>
                        <Col span={6} className={styles.cell}>
                            {crash[1]}
                        </Col>
                        <Col span={6} className={styles.cell}>
                            {100 / crash[1]}%
                        </Col>
                    </Row>
                );
            })}

            <Row>
                <Col span={24} style={{ fontWeight: 'bold', padding: 5, backgroundColor: '#eee' }}>Weather Conditions</Col>
            </Row>
            {inventory && inventory.crash_intersections && getWeatherCondition(inventory.crash_intersections).map(crash => {
                return (
                    <Row key={crash[0]}>
                        <Col span={12} className={styles.cell}>
                            {crash[0]}
                        </Col>
                        <Col span={6} className={styles.cell}>
                            {crash[1]}
                        </Col>
                        <Col span={6} className={styles.cell}>
                            {100 / crash[1]}%
                        </Col>
                    </Row>
                );
            })}


            <Row>
                <Col span={24} style={{ fontWeight: 'bold', padding: 5, backgroundColor: '#eee' }}>Road Surface Conditions</Col>
            </Row>
            {inventory && inventory.crash_intersections && getRoadSurfaceCondition(inventory.crash_intersections).map(crash => {
                return (
                    <Row key={crash[0]}>
                        <Col span={12} className={styles.cell}>
                            {crash[0]}
                        </Col>
                        <Col span={6} className={styles.cell}>
                            {crash[1]}
                        </Col>
                        <Col span={6} className={styles.cell}>
                            {100 / crash[1]}%
                        </Col>
                    </Row>
                );
            })}

        </div>
    );
}

export default Descriptive;