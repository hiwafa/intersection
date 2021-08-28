import Head from 'next/head';
import Link from "next/link";
import { useRouter } from "next/router";

import { Layout, Menu, Image } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { UserOutlined } from '@ant-design/icons';

import Login from "./Login";
import { useSelector } from 'react-redux';
import { isLoggedIn, getUser } from '../store/actions/UserSlice';

import styles from "../../styles/Layout.module.css";

const LayoutCom = ({ children }) => {

    const checkLogin = useSelector(isLoggedIn);
    const {username} = useSelector(getUser);

    if (checkLogin === 'loading') return (
        <div>
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

            <main style={{
                padding: 50, paddingBottom: 10, borderWidth: 1,
                borderColor: '#eee', borderStyle: 'solid', borderRadius: 10
            }}>
                <Login />
            </main>
        </div>
    );


    const router = useRouter();
    let padname = router.pathname;

    if (padname === "/") padname = "home";
    else padname = padname.substring(1);

    return (
        <Layout>
            <Sider
                breakpoint="lg" collapsedWidth="0" theme="light"
                zeroWidthTriggerStyle={{ top: 13 }}
            >

                <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', height: 64
                }}>
                    <Image src="/logo.jpg" />
                </div>

                <Menu theme="light" mode="inline" defaultSelectedKeys={[padname]}>
                    <Menu.Item key="home" icon={<UserOutlined />}>
                        <Link href="/">
                            <a>Analyst</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="admin" icon={<UserOutlined />}>
                        <Link href="/admin">
                            <a>Admin</a>
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
                    <span>
                        {username ? username : "Sign In"}
                    </span>
                </Header>

                <Content style={{
                    margin: '24px 16px 0',
                    overflowY: 'scroll',
                    height: '100vh'
                }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2016 Created by Ant UED
                </Footer>
            </Layout>

        </Layout>
    );

}

export default LayoutCom;