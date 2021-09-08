import react, { useState } from "react"
import styled from "styled-components"
import {Button, Row, Col} from "antd"
import CreateProject from "../components/createProject"
import SearchProject from "../components/searchProject"
import ProjectDetails from "../src/components/projectDetails"
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
         <ProjectDetails projectId={projectId} /> : 
        <ButtonContainer>
            <h3>Projects</h3>
            <Row gutter={[50, 10]}>
                <Col md={12} lg={12}><Button onClick={() => handleClick(true)} size={"large"} type={"primary"} block>Search Projects</Button></Col>
                <Col md={12} lg={12}><Button onClick={() => handleClick(false)} size={"large"} type={"primary"} block>Create Projects</Button></Col>
                <Col md={24} lg={24}>
                    {search ? <SearchProject setProjectId={setProjectId} setShowDetails={setShowDetails} /> : <CreateProject />}
                </Col>
            </Row>
        </ButtonContainer>}   
        </>
}

export default Projects