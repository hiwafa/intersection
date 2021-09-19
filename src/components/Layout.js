import Head from 'next/head';
import Link from "next/link";
import { useRouter } from "next/router";

import { Layout, Menu, Image, Dropdown } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { UserOutlined, ProjectOutlined, LogoutOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';

import Login from "./Login";

import { useSelector, useDispatch } from 'react-redux';
import { isLoggedIn, getUser, signout } from '../store/actions/UserSlice';

import styles from "../../styles/Layout.module.css";
import styled from "styled-components"
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

    const checkLogin = useSelector(isLoggedIn);
    const { username } = useSelector(getUser);
    const dispatch = useDispatch();
    const onLogout = async () => {
        try {
            await dispatch(signout(null));
        } catch (err) {

        }
    };
    const menu = (
        <Menu>
          <Menu.Item>
            <a target="_blank" rel="" href="#">
              Reset Password
            </a>
          </Menu.Item>
          <Menu.Item>
            <LogoutOutlined onClick={onLogout} style={{ marginRight: "10px" }} /> Log Out
          </Menu.Item>
        </Menu>
      );

    const router = useRouter();
    let padname = router.pathname;

    if (padname === "/") padname = "home";
    else if (padname === "/projects/create") padname = "projects";
    else padname = padname.substring(1);

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
                            <a>User Management</a>
                        </Link>
                    </Menu.Item>
                </Menu>

            </Sider>

            <Layout>

                <Header style={{
                    background: '#fff', padding: 0,
                    paddingLeft: 70, paddingRight: 70,
                    display: 'flex', justifyContent: 'flex-end'
                }}>
                    <LogoutIcon>
                        {username ? 
                        <Dropdown overlay={menu} trigger={"click"} placement="bottomLeft" arrow>
                        <UserNameLabel>{username}</UserNameLabel>
                      </Dropdown>
                        : "Login"}
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
                <Footer style={{ textAlign: 'center' }}>
                    Safety Analytica ©2021 Developed by TheCodeGiant
                </Footer>
            </Layout>

        </Layout>
    );

}

export default LayoutCom;