import react, { useState } from "react"
import styled from "styled-components"
import {Button, Row, Col} from "antd"
import SearchProject from "../src/components/searchProject"
import CreateProject from "../src/components/createProject"
import ProjectDetails from "../src/components/projectDetails"
import EditProject from "../src/components/editProject"

import { PlusCircleOutlined } from '@ant-design/icons';
import {PageTitle} from "../src/components/styleds"
const ButtonContainer = styled.div`
    padding: 10px;
`

function Projects(){
    const [search, setSearch] = useState(true)
    const [showDetails, setShowDetails] = useState(false)
    const [section,setSection] = useState("")
    const [project, setProject] = useState("")
    const handleClick = (status) => {
        console.log("called")
        setSearch(status)
    }
    return <>
        {showDetails ?
         (section && section === "edit" ? <EditProject project={project} setShowDetails={setShowDetails} /> :<ProjectDetails project={project} setShowDetails={setShowDetails} />) : 
        <ButtonContainer>
          {search && <PageTitle>Projects <PlusCircleOutlined className={"createProject"} onClick={() => handleClick(false)} /></PageTitle> }
            <Row gutter={[50, 10]}>
                <Col md={24} lg={24}>
                    {search ? <SearchProject setProject={setProject} setShowDetails={setShowDetails} setSection={setSection} /> : <CreateProject handleClick={handleClick} />}
                </Col>
            </Row>
        </ButtonContainer>}   
        </>
}

export default Projects