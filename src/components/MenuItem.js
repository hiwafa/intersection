import React from 'react';
import { bool, func, string } from 'prop-types';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';

const styles = {
    activeBar: {
        height: 56, width: 3,
        backgroundColor: '#DDE2FF',
        position: 'absolute', left: 0
    },
    activeContainer: {
        backgroundColor: 'rgba(221,226,255, 0.08)'
    },
    activeTitle: { color: '#DDE2FF' },
    container: {
        height: 56,
        cursor: 'pointer', ':hover': {
            backgroundColor: 'rgba(221,226,255, 0.08)'
        },
        paddingLeft: 32,
        paddingRight: 32
    },
    title: {
        fontFamily: 'Muli',
        fontSize: 16,
        lineHeight: '20px',
        letterSpacing: '0.2px',
        color: '#A4A6B3',
        marginLeft: 24
    }
}

const  MenuItem = ({ active, icon, title, ...otherProps }) => {

    const Icon = icon;
    const conStyle = active ? {...styles.container, ...styles.activeContainer} : styles.container;
    const titStyle = active ? {...styles.title, ...styles.activeTitle} : styles.title;

    return (
        <Row className={conStyle} vertical="center" {...otherProps}>
            {active && <div className={styles.activeBar}></div>}
            <Icon fill={active && "#DDE2FF"} opacity={!active && "0.4"} />
            <span className={titStyle}>{title}</span>
        </Row>
    );
}

MenuItem.propTypes = {
    active: bool,
    icon: func,
    title: string
};

export default MenuItem;