import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Login from "../src/components/Login";
import { isLoggedIn } from '../src/store/actions/UserSlice';
import { useSelector } from 'react-redux';


import { Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { UserOutlined } from '@ant-design/icons';

const Home = () => {

  const checkLogin = useSelector(isLoggedIn);

  return (
    <Layout>
      <Sider
        breakpoint="lg" collapsedWidth="0"
        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
      >
        <Image src="/favicon.ico" width={"100%"} height={50} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1">
            <UserOutlined />
            <span className="nav-text">nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <UserOutlined />
            <span className="nav-text">nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <UserOutlined />
            <span className="nav-text">nav 3</span>
          </Menu.Item>
          <Menu.Item key="4">
            <UserOutlined />
            <span className="nav-text">nav 4</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            content
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );

  if (checkLogin === 'loading') return (
    <div className={styles.container}>
      <Head>
        <title>Intersection</title>
        <meta name="description" content="intersection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        loading ...
      </main>

      <footer className={styles.footer}>
        footer
      </footer>
    </div>
  );

  if (checkLogin === "loaded") return (
    <div className={styles.container}>
      <Head>
        <title>Register Your Self</title>
        <meta name="description" content="intersection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        Welcome you logged in
      </main>

      <footer className={styles.footer}>
        footer
      </footer>
    </div>
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Intersection</title>
        <meta name="description" content="intersection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Login />
      </main>

      <footer className={styles.footer}>
        footer
      </footer>
    </div>
  );

}

export default Home;