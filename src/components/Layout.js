import Head from 'next/head';
import Link from "next/link";
import { useRouter } from "next/router";

import { Layout, Menu, Image } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { UserOutlined, ProjectOutlined, LogoutOutlined } from '@ant-design/icons';

import Login from "./Login";

import { useSelector, useDispatch } from 'react-redux';
import { isLoggedIn, getUser, signout } from '../store/actions/UserSlice';

import styles from "../../styles/Layout.module.css";

const LayoutCom = ({ children }) => {

    const checkLogin = useSelector(isLoggedIn);
    const { username } = useSelector(getUser);
    const dispatch = useDispatch();


    const router = useRouter();
    let padname = router.pathname;

    console.log("path::::1", padname);

    if (padname === "/") padname = "home";
    else if (padname === "/projects/create") padname = "projects";
    else padname = padname.substring(1);

    console.log("path::::2", padname);

    const onLogout = async ()=> {
        try {
            await dispatch(signout(null));
        } catch (err) {
            
        }
    };

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
                    <Menu.Item key="home" icon={<UserOutlined />}>
                        <Link href="/">
                            <a>Analyst</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="projects" icon={<ProjectOutlined />}>
                        <Link href="/projects">
                            <a>Projects</a>
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
                        {username ? <> {username} <LogoutOutlined onClick={onLogout} style={{marginLeft: "10px"}} /></> : "Sign In"} 
                    </span>
                    
                </Header>

                <Content style={{
                    // margin: '24px 16px 0',
                    overflowY: 'scroll',
                    height: '100vh'
                }}>
                    <div style={{ background: '#eee', minHeight: 360 }}>
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