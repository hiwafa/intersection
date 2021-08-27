

const  MenuItem = ({ active, icon, title, ...otherProps }) => {
    
    const Icon = icon;
    return (
        <Row className={css(styles.container, active && styles.activeContainer)} vertical="center" {...otherProps}>
            {active && <div className={css(styles.activeBar)}></div>}
            <Icon fill={active && "#DDE2FF"} opacity={!active && "0.4"} />
            <span className={css(styles.title, active && styles.activeTitle)}>{title}</span>
        </Row>
    );
}

MenuItem.propTypes = {
    active: bool,
    icon: func,
    title: string
};

export default MenuItem;