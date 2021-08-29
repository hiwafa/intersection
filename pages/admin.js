import React from "react";
import GoogleMapReact from 'google-map-react';
import { useRouter } from "next/router";

import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627
  },
  zoom: 11
};

const Admin = () => {

  return (
    <Layout>
      <div style={{ height: '40vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
      <Header style={{ width: '100%', backgroundColor: '#fff' }}>
        <div className="logo" />
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">Descriptive Statistics</Menu.Item>
          <Menu.Item key="2">Crash Data</Menu.Item>
          <Menu.Item key="3">Intersection Inventory</Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          Content
        </div>
      </Content>
    </Layout>

  );
}

export default Admin;