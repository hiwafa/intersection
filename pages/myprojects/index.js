import react, { useEffect, useState } from "react"
import styled from "styled-components"
import {Button, Row, Col} from "antd"
import SearchProject from "../src/components/searchProject"
import CreateProject from "../src/components/createProject"
import ProjectDetails from "../src/components/projectDetails"
import EditProject from "../src/components/editProject"
import {useQueryParam} from "../src/utils/useQueryParam"
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
    const queryParam = useQueryParam();
    const handleClick = (status) => {
        setSearch(status)
    }
    useEffect(()=>{
        if(queryParam?.create && queryParam?.create == 1)
        {
            setSearch(false)
        }
    })
    return <>
        {showDetails ?
         (section && section === "edit" ? <EditProject project={project} setShowDetails={setShowDetails} /> :<ProjectDetails project={project} setShowDetails={setShowDetails} />) : 
        <ButtonContainer>
          {search && <PageTitle>Projects <PlusCircleOutlined className={"createProject"} onClick={() => handleClick(false)} /></PageTitle> }
            <Row gutter={[50, 10]}>
                <Col md={24} lg={24}>
                    <SearchProject setProject={setProject} setShowDetails={setShowDetails} setSection={setSection} />
                </Col>
            </Row>
        </ButtonContainer>}   
        </>
}

export default Projects