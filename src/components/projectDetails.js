import react, { useEffect } from "react"
import styled from "styled-components"
import {Table} from "antd"
import {request} from "../requests"
import { ArrowLeftOutlined } from '@ant-design/icons';

const Wrapper = styled.div`
    padding: 30px;
`
const columns = [
    {
    title: 'Field',
    dataIndex: 'field',
    align: 'right',
    },

    {
    title: 'Value',
    dataIndex: 'value',
    align: 'right',
    }
  ];
  const data = [
      {
        field: "name",
        value: "value"
      },
      {
        field: "name",
        value: "value"
      }
  ]

function ProjectDetails({projectId, setShowDetails}){
    const loadProject = async () =>{
        const res = await request(`projects/${projectId}`, {
            method: "GET",
          });
          if(res.status === 200)
            {
                console.log("details", res.data.PROJECT_NAME)
            }
      }
      useEffect(()=>{
          loadProject()
      }, [projectId])
    return <Wrapper style={{width: "600px"}}>
                <ArrowLeftOutlined onClick={() => setShowDetails(false)} />
                <h2>Project Details</h2>
                <Table pagination={false} columns={columns} dataSource={data} tableLayout={"horizontal"} />
            </Wrapper>
}
export default ProjectDetails