import react, { useEffect, useState } from "react"
import styled from "styled-components"
import {Table} from "antd"
import { LeftCircleOutlined } from '@ant-design/icons';
import {PageTitle, TableContainer} from "./styleds"

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

function ProjectDetails({project, setShowDetails}){
  const [details, setDetails] = useState()
  useEffect(()=>{
    project && setDetails([
                {field: <b>{"Project Name"}</b>, value: project.PROJECT_NAME},
                {field: <b>{"Project Number"}</b>, value: project.PROJECT_NUMBER},
                {field: <b>{"Project Status"}</b>, value: project.PROJECT_STATUS},
                {field: <b>{"Intersection"}</b>, value: project.INTERSECTION},
                {field: <b>{"Ben_COST"}</b>, value: project.BEN_COST},
                {field: <b>{"Crash Count"}</b>, value: project.CRASH_COUNT},
                {field: <b>{"Crash Start Date"}</b>, value: project.CRASH_START_DATE},
                {field: <b>{"Crash End Date"}</b>, value: project.CRASH_END_DATE},
                {field: <b>{"Crash Rate AADT"}</b>, value: project.CRASH_RATE_AADT},
                {field: <b>{"EPDO"}</b>, value: project.EPDO},
                {field: <b>{"EUAB"}</b>, value: project.EUAB},
                {field: <b>{"EUAC"}</b>, value: project.EUAC},
                {field: <b>{"Number of A injuries"}</b>, value: project.NUMBER_OF_A_INJURIES},
                {field: <b>{"Number of B injuries"}</b>, value: project.NUMBER_OF_B_INJURIES},
                {field: <b>{"Number of C injuries"}</b>, value: project.NUMBER_OF_C_INJURIES},
                {field: <b>{"Number of Fatalities"}</b>, value: project.NUMBER_OF_FATALITIES},
                {field: <b>{"Number of Injuries"}</b>, value: project.NUMBER_OF_INJURIES},
                {field: <b>{"Number of PDO"}</b>, value: project.NUMBER_OF_PDO},
                {field: <b>{"Program Name"}</b>, value: project.PROGRAM_NAME},
                {field: <b>{"Program Number"}</b>, value: project.PROGRAM_NUMBER},
                {field: <b>{"Project Auth Date"}</b>, value: project.PROJECT_AUTH_DATE},
                {field: <b>{"Project Comp Date"}</b>, value: project.PROJECT_COMP_DATE},
                {field: <b>{"Project Start Date"}</b>, value: project.PROJECT_START_DATE},
                {field: <b>{"Project End Date"}</b>, value: project.PROJECT_END_DATE},
                {field: <b>{"Project Sub Phase"}</b>, value: project.PROJECT_SUBPHASE},
                {field: <b>{"Project Treatments"}</b>, value: project.project_treatments}
              ])
      }, [project])
    return <Wrapper style={{width: "380px"}}>
              <PageTitle> <LeftCircleOutlined className={"backButton"} onClick={() => setShowDetails(false)} />Project Details</PageTitle>
              <TableContainer>
              <Table pagination={false} columns={columns} dataSource={details && details} tableLayout={"horizontal"} />
              </TableContainer>
            </Wrapper>
}
export default ProjectDetails