import React, {useState} from "react";
import GoogleMapReact from 'google-map-react';
import { useRouter } from "next/router";

import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

import { Bubble } from 'react-chartjs-2';


const data = {
  datasets: [{
    label: 'First Dataset',
    data: [{
      x: 20,
      y: 30,
      r: 15
    }, {
      x: 40,
      y: 10,
      r: 10
    }],
    backgroundColor: 'rgb(255, 99, 132)'
  }]
};
const config = {
  type: 'bubble',
  data: data,
  options: {}
};



const AnyReactComponent = ({ text }) => <div>{text}</div>;

const getContent = tab => {

  switch(tab){
    case "tab1": return <Bubble {...config} />;
    case "tab2": return <div>content 2</div>;
    case "tab3": return <div>content 3</div>;
    default: return null;
  }

}

const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627
  },
  zoom: 11
};

const Admin = () => {

  const [tab, setTab] = useState("tab1");

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
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['tab1']}>
          <Menu.Item key="tab1" onClick={()=> setTab("tab1")}>Descriptive Statistics</Menu.Item>
          <Menu.Item key="tab2" onClick={()=> setTab("tab2")}>Crash Data</Menu.Item>
          <Menu.Item key="tab3" onClick={()=> setTab("tab3")}>Intersection Inventory</Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-background" style={{ minHeight: 380 }}>
          {getContent(tab)}
        </div>
      </Content>
    </Layout>

  );
}

export default Admin;