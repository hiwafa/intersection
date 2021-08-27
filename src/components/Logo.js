import React from 'react';
import logo from '/favicon.ico';
import Image from "next/image"
import { Row } from 'simple-flexbox';
import styles from '../../styles/Logo.module.css';


const Logo = ()=> {

    return (
        <Row className={styles.container} horizontal="center" vertical="center">
            <Image src={logo} />
            <span className={styles.title}>Intersection</span>
        </Row>
    );
}


export default Logo;