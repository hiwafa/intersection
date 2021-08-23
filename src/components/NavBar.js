import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "../../styles/NavBar.module.css";
import logo from "/public/logo.jpg";
import Image from 'next/image'


const NavBar = ({ menu }) => {
    const [visible, setVisible] = useState(false);
    return (
        <nav className="navbar">

            <div style={{ display: 'flex', flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{maxWidth: 200, display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
                    <a style={{ alignSelf: 'center' }} href="/"><Image src="/logo.jpg" alt="me" width="100" height="44" /></a>
                    <MenuOutlined onClick={() => setVisible(true)} />
                </div>
                <div style={{ flex: 1 }} />
            </div>

            <Drawer
                title="Topics"
                placement="left"
                onClick={() => setVisible(false)}
                onClose={() => setVisible(false)}
                visible={visible}
            >
                {menu}
            </Drawer>
            {/* <a href="/"><img src={logo} className="logo" alt="logo" /></a>      */}

        </nav>
    );
};
export default NavBar;