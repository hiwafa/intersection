import react, { useEffect, useState } from "react"
import styled from "styled-components"
import {Table} from "antd"
import {request} from "../requests"
import { LeftCircleOutlined } from '@ant-design/icons';
import {PageTitle} from "./styleds"

const Wrapper = styled.div`
    padding: 10px;
`
const columns = [
    {
    title: 'Field',
    dataIndex: 'field',
    align: 'left',
    },

    {
    title: 'Value',
    dataIndex: 'value',
    align: 'left',
    }
  ];
  const data = [
      {
        field: "name",
        value: "value"
      }
  ]

function ProjectDetails({projectId, setShowDetails}){
  const [details, setDetails] = useState()
    const loadProject = async () =>{
        const res = await request(`projects/${projectId}`, {
            method: "GET",
          });
          if(res.status === 200)
            {
              setDetails([
                {field: <b>{"Project Name"}</b>, value: res.data.PROJECT_NAME},
                {field: <b>{"Project Number"}</b>, value: res.data.PROJECT_NUMBER},
                {field: <b>{"Project Status"}</b>, value: res.data.PROJECT_STATUS},
                {field: <b>{"Intersection"}</b>, value: res.data.INTERSECTION},
                {field: <b>{"Ben_COST"}</b>, value: res.data.BEN_COST},
                {field: <b>{"Crash Count"}</b>, value: res.data.CRASH_COUNT},
                {field: <b>{"Crash Start Date"}</b>, value: res.data.CRASH_START_DATE},
                {field: <b>{"Crash End Date"}</b>, value: res.data.CRASH_END_DATE},
                {field: <b>{"Crash Rate AADT"}</b>, value: res.data.CRASH_RATE_AADT},
                {field: <b>{"EPDO"}</b>, value: res.data.EPDO},
                {field: <b>{"EUAB"}</b>, value: res.data.EUAB},
                {field: <b>{"EUAC"}</b>, value: res.data.EUAC},
                {field: <b>{"Number of A injuries"}</b>, value: res.data.NUMBER_OF_A_INJURIES},
                {field: <b>{"Number of B injuries"}</b>, value: res.data.NUMBER_OF_B_INJURIES},
                {field: <b>{"Number of C injuries"}</b>, value: res.data.NUMBER_OF_C_INJURIES},
                {field: <b>{"Number of Fatalities"}</b>, value: res.data.NUMBER_OF_FATALITIES},
                {field: <b>{"Number of Injuries"}</b>, value: res.data.NUMBER_OF_INJURIES},
                {field: <b>{"Number of PDO"}</b>, value: res.data.NUMBER_OF_PDO},
                {field: <b>{"Program Name"}</b>, value: res.data.PROGRAM_NAME},
                {field: <b>{"Program Number"}</b>, value: res.data.PROGRAM_NUMBER},
                {field: <b>{"Project Auth Date"}</b>, value: res.data.PROJECT_AUTH_DATE},
                {field: <b>{"Project Comp Date"}</b>, value: res.data.PROJECT_COMP_DATE},
                {field: <b>{"Project Start Date"}</b>, value: res.data.PROJECT_START_DATE},
                {field: <b>{"Project End Date"}</b>, value: res.data.PROJECT_END_DATE},
                {field: <b>{"Project Sub Phase"}</b>, value: res.data.PROJECT_SUBPHASE},
                {field: <b>{"Project Treatments"}</b>, value: res.data.project_treatments}
              ])
              console.log(Object.keys(res.data).length)
                console.log("details", res.data.PROJECT_NAME)
            }
      }
      useEffect(()=>{
          loadProject()
      }, [projectId])
    return <Wrapper style={{width: "500px"}}>
      {console.log("detailsss", details)}
              <PageTitle> <LeftCircleOutlined className={"backButton"} onClick={() => setShowDetails(false)} />Project Details</PageTitle>
              <Table pagination={false} columns={columns} dataSource={details && details} tableLayout={"horizontal"} />
            </Wrapper>
}
export default ProjectDetails