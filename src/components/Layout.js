import Head from 'next/head';
import Link from "next/link";
import { useRouter } from "next/router";

import { Layout, Menu, Image, Dropdown, Modal, Form, Input, Spin } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import {
    UserOutlined, EditOutlined, ProjectOutlined,
    LogoutOutlined, FundProjectionScreenOutlined,
    LockOutlined, RedoOutlined
} from '@ant-design/icons';


import { useSelector, useDispatch } from 'react-redux';
import { useGetIntersectionsQuery } from '../store/query';
import { isLoggedIn, getUser, signout, updatePass } from '../store/actions/UserSlice';

import { css } from '@emotion/css';
import { StyledButton } from './styleds';
import styles from "../../styles/Layout.module.css";
import styled from "styled-components"
import { useState } from 'react';
import Login from "./Login";

const spinStyle = css({
    '.ant-spin-dot-item': { backgroundColor: `#fff;` }
});

const LogoutIcon = styled.div`
    span{
        &:hover{
            color: #00A9B3;
        }
    }
`
const UserNameLabel = styled.span`
    &:hover{
        cursor: pointer
    }
`


const LayoutCom = ({ children }) => {

    const [show, setShow] = useState(false);
    const [spining, setSpining] = useState(false);
    const checkLogin = useSelector(isLoggedIn);
    const { username, role, password, id } = useSelector(getUser);
    const { refetch } = useGetIntersectionsQuery("intersection-inventories");
    const dispatch = useDispatch();

    const router = useRouter();
    let padname = router.pathname;

    if (padname === "/") padname = "home";
    else if (padname === "/projects/create" ||
        padname === "/projects/edit" ||
        padname === "/projects/view") padname = "projects";
    else padname = padname.substring(1);

    const onLogout = async () => {
        try {
            await dispatch(signout(null));
        } catch (err) {

        }
    };

    const onFinish = async (values) => {
        try {

            if (spining === true) return;
            setSpining(true);
            await dispatch(updatePass({ ...values, id }));
            setSpining(false); setShow(false);

        } catch (err) {
            console.log("ERR:register:onFinish ", err);
        }
    };

    const menu = (
        <Menu>
            <Menu.Item onClick={() => setShow(true)}>
                <EditOutlined style={{ marginRight: "10px" }} /> Reset Password
            </Menu.Item>
            <Menu.Item onClick={onLogout}>
                <LogoutOutlined style={{ marginRight: "10px" }} /> Log Out
            </Menu.Item>
        </Menu>
    );

    if (checkLogin === 'loading') return (
        <div className={styles.container}>
            <Head>
                <title>Intersection</title>
                <meta name="description" content="intersection" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                loading ...
            </main>

        </div>
    );

    if (checkLogin === 'failed') return (
        <div className={styles.container}>
            <Head>
                <title>Intersection</title>
                <meta name="description" content="intersection" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.loginForm}>

                <div className={styles.caption}>
                    <Image src="/logo.jpg" preview={false} alt="logo" width={200} />
                    <p className={styles.captionFont}>Hello User! Please sign in</p>
                </div>

                <Login />
            </main>
        </div>
    );

    const conditionalRendering = () => {

        if (role.id === 1) return (
            <Menu theme="light" mode="inline" defaultSelectedKeys={[padname]}>
                <Menu.Item key="home" icon={<FundProjectionScreenOutlined />}>
                    <Link href="/">
                        <a>Analysis</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="projects" icon={<ProjectOutlined />}>
                    <Link href="/projects">
                        <a>Projects</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="admin" icon={<UserOutlined />}>
                    <Link href="/admin">
                        <a>Super Admin</a>
                    </Link>
                </Menu.Item>
            </Menu>
        );

        if (role.id === 3) return (
            <Menu theme="light" mode="inline" defaultSelectedKeys={[padname]}>
                <Menu.Item key="home" icon={<FundProjectionScreenOutlined />}>
                    <Link href="/">
                        <a>Analysis</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="projects" icon={<ProjectOutlined />}>
                    <Link href="/projects">
                        <a>Projects</a>
                    </Link>
                </Menu.Item>
            </Menu>
        );

        return (
            <Menu theme="light" mode="inline" defaultSelectedKeys={[padname]}>
                <Menu.Item key="projects" icon={<ProjectOutlined />}>
                    <Link href="/projects">
                        <a>Projects</a>
                    </Link>
                </Menu.Item>
            </Menu>
        );

    }

    return (
        <Layout>
            <Sider
                breakpoint="md" collapsedWidth="0" theme="light"
                zeroWidthTriggerStyle={{ top: 13 }}
            >

                <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', height: 64
                }}>
                    <Link href="/"><a><Image src="/logo.jpg" alt="logo" preview={false} /></a></Link>
                </div>

                {conditionalRendering()}

            </Sider>
            <Layout>

                <Header style={{
                    background: '#fff', padding: 0,
                    paddingLeft: 70, paddingRight: 70,
                    display: 'flex', justifyContent: 'flex-end'
                }}>
                    <LogoutIcon>
                        <Dropdown overlay={menu} trigger={"click"} placement="bottomLeft" arrow>
                            <UserNameLabel style={{ fontSize: '18px', fontWeight: 'bold' }}>{username}</UserNameLabel>
                        </Dropdown>
                        <a onClick={() => { refetch() }} style={{ marginLeft: 10 }}>
                            <RedoOutlined style={{ fontSize: '18px', fontWeight: 'bold' }} />
                        </a>
                    </LogoutIcon>

                </Header>

                <Content style={{
                    // margin: '24px 16px 0',
                    overflow: 'scroll',
                    height: '100vh'
                }}>
                    <div style={{ minHeight: 360, height: "100%" }}>
                        {children}
                    </div>
                </Content>

                <Modal
                    title="Edit Password"
                    visible={show} footer={null}
                    onCancel={() => setShow(false)}
                >
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="password"
                            initialValue={password}
                            rules={[{
                                required: true,
                                message: "Please input your password!",
                            }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <StyledButton type="submit" style={{ marginBottom: 10 }}>
                                {
                                    spining ? <Spin size="small" className={spinStyle} /> : "Update"
                                }
                            </StyledButton>
                        </Form.Item>

                    </Form>
                </Modal>

                <Footer style={{ textAlign: 'center' }}>
                    Safety Analytica ©2021 Developed by TheCodeGiant
                </Footer>
            </Layout>

        </Layout>
    );

}

export default LayoutCom;