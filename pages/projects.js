import react, { useState } from "react"
import styled from "styled-components"
import {Button, Row, Col} from "antd"
import SearchProject from "../src/components/searchProject"
import CreateProject from "../src/components/createProject"
import ProjectDetails from "../src/components/projectDetails"
import { PlusCircleOutlined } from '@ant-design/icons';
import {PageTitle} from "../src/components/styleds"
const ButtonContainer = styled.div`
    padding: 10px;
`

function Projects(){
    const [search, setSearch] = useState(true)
    const [showDetails, setShowDetails] = useState(false)
    const [projectId, setProjectId] = useState("")
    const handleClick = (status) => {
        setSearch(status)
    }
    return <>
        {showDetails ?
         <ProjectDetails projectId={projectId} setShowDetails={setShowDetails} /> : 
        <ButtonContainer>
          {search && <PageTitle>Projects <PlusCircleOutlined className={"createProject"} onClick={() => handleClick(false)} /></PageTitle> }
            <Row gutter={[50, 10]}>
                <Col md={24} lg={24}>
                    {search ? <SearchProject setProjectId={setProjectId} setShowDetails={setShowDetails} /> : <CreateProject handleClick={handleClick} />}
                </Col>
            </Row>
        </ButtonContainer>}   
        </>
}

export default Projects