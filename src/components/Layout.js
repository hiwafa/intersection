import Head from 'next/head';
import { useRouter } from "next/router";
import Link from "next/link";

import { Layout, Menu, Image } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { UserOutlined } from '@ant-design/icons';

const LayoutCom = ({ children }) => {

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

        <div style={{ display: 'flex', height: 64, alignItems: 'center', justifyContent: 'center' }}>
          <Image src="/logo.jpg" />
        </div>

        <Menu theme="light" mode="inline" defaultSelectedKeys={[padname]}>

          <Menu.Item key="home" icon={<UserOutlined />}>
            <Link href="/">
              <a>Dashboard</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="sites" icon={<UserOutlined />}>
            <Link href="/sites">
              <a>Sites</a>
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
          <span>Sign In</span>
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