import React from 'react';
import logo from '/favicon.ico';
import Image from "next/image"
import { Row } from 'antd';
import styles from '../../styles/Logo.module.css';


const Logo = ()=> {

    return (
        <Row className={styles.container}>
            <Image src={logo} />
            <span className={styles.title}>Intersection</span>
        </Row>
    );
}


export default Logo;