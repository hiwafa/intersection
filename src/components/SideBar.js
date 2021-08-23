import React from "react";
import { Layout } from "antd";

import "../../styles/SideBar.module.css";

const SideBar = ({ menu }) => {
    return (
      <Layout.Sider
        className="sidebar"
        breakpoint={"lg"}
        theme="light"
        collapsedWidth={0}
        trigger={null}
      >
        {menu}
     </Layout.Sider>
     );
  };
  export default SideBar;

