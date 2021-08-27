import React from 'react';
import Image from "next/image"
import { Row } from 'antd';
import styles from '../../styles/Logo.module.css';


const Logo = ()=> {

    return (
        <Row className={styles.container}>
            <Image src="/favicon.ico" />
            <span className={styles.title}>Intersection</span>
        </Row>
    );
}


export default Logo;