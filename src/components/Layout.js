import Head from 'next/head';
import Link from "next/link";
import { useRouter } from "next/router";

import { Layout, Menu, Image } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { UserOutlined } from '@ant-design/icons';

import Login from "./Login";
import SignUp from './Signup';

import { useSelector } from 'react-redux';
import { isLoggedIn, getUser } from '../store/actions/UserSlice';

import styles from "../../styles/Layout.module.css";

const LayoutCom = ({ children }) => {

    const checkLogin = useSelector(isLoggedIn);
    const { username } = useSelector(getUser);


    const router = useRouter();
    let padname = router.pathname;

    if (padname === "/") padname = "home";
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

    console.log("paddname", padname);
    if (checkLogin === 'failed' && padname === 'register') return (
        <div className={styles.container}>
            <Head>
                <title>Intersection</title>
                <meta name="description" content="intersection" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.loginForm}>

                <div className={styles.caption}>
                    <Image src="/logo.jpg" alt="logo" width={200} />
                    <p className={styles.captionFont}>Hello User! Please sign up</p>
                </div>

                {children}
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
                    <Image src="/logo.jpg" alt="logo" width={200} />
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
                    <Image src="/logo.jpg" alt="logo" />
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
                    <div style={{ background: '#fff', minHeight: 360 }}>
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