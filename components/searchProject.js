import react, { useState, useEffect } from "react"
import {Button, Row, Col, Form, Table, Select, DatePicker, Input, message} from "antd"
import {request} from "../src/requests"
const columns = [
    {
      title: () => <b>{'PROJECT NAME'}</b>,
      dataIndex: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'ROUTE',
      className: 'column-money',
      dataIndex: 'route',
      align: 'right',
    },
    {
      title: 'DIRECTION',
      dataIndex: 'direction',
    },
    {
        title: 'START MP',
        dataIndex: 'startMp',
    },
    {
        title: 'END MP',
        dataIndex: 'endMp',
    },
    {
        title: 'NO OF CRASHES',
        dataIndex: 'numberOfCrashes',
    },
    {
        title: 'TOTAL TREATMENT',
        dataIndex: 'totalTreatment',
    },
  ];
  
function SearchProject(){
    const [projects, setProjects] = useState([])
    const loadProjects = async () => {
        const res = await request("projects", {
            method: "GET",
          });
          if(res.status === 200)
          {
            setProjects(
              res.data.map((project, index) => ({
                      key: index,
                      name: project.PROJECT_NAME,
                      route: "Route",
                      direction: "direction",
                      startMp: "start mp",
                      endMp: "end mp",
                      numberOfCrashes: "number of crashes",
                      totalTreatment: "total treatment"
              })
              )
            )
          }
      }
      useEffect(()=>{
        loadProjects()
      }, [])
    return <>
        <h2>Search Project</h2>
        <div>
        <Table
            columns={columns}
            dataSource={projects && projects}
            bordered
            filterSearch={true}
            // title={() => 'Header'}
            footer={() => 'Footer'}
        />
        </div>
        </>
}

export default SearchProject;