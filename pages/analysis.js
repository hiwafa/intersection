import react from "react"
import {Row, Col, Tabs, Layout} from "antd"
import GoogleMapReact from 'google-map-react';
import DescriptiveStatistics from "../components/descriptiveStatistics"
import CrashData from "../components/crashData"
import IntersectionInventory from "../components/intersectionInverntory"
const { TabPane } = Tabs;
function Analysis() {
    const defaultProps = {
        center: {
          lat: 10.99835602,
          lng: 77.01502627
        },
        zoom: 11
      };
      function callback(key) {
        console.log(key);
      }
    return <div style={{width: "inherit", height: "100%"}}>
                <Row gutter={[16]} style={{height: "100%"}}>
                    <Col lg={12} md={12}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "" }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        >
                        <div
                            lat={59.955413}
                            lng={30.337844}
                            text="My Marker"
                        />
                    </GoogleMapReact>
                    </Col>
                    <Col lg={12} md={12}>
                        <div style={{height: "100%", border: "0.1em solid lightgrey", padding: "5px"}}>
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="Descriptive Statistics" key="1">
                                <DescriptiveStatistics />
                            </TabPane>
                            <TabPane tab="Crash Data" key="2">
                                <CrashData />
                            </TabPane>
                            <TabPane tab="Intersection Inventory" key="3">
                                <IntersectionInventory />
                            </TabPane>
                        </Tabs>
                        </div>
                    </Col>
                </Row>
            </div>
}
export default Analysis