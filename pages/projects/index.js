import react, { useEffect, useState } from "react"
import styled from "styled-components"
import { Button, Row, Col } from "antd"
import SearchProject from "../../src/components/searchProject"
import ProjectDetails from "../../src/components/projectDetails"
import EditProject from "../../src/components/editProject"
import { useQueryParam } from "../../src/utils/useQueryParam"
import { PlusCircleOutlined } from '@ant-design/icons';
import { PageTitle, ThemButton } from "../../src/components/styleds"
const ButtonContainer = styled.div`
    padding: 10px;
`

import { useRouter } from "next/router";

function Projects() {

    const router = useRouter();
    const [showDetails, setShowDetails] = useState(false)
    const [section, setSection] = useState("");
    const [project, setProject] = useState("");
    const [intersection, setInterSection] = useState({})
    return <div>
        {showDetails ?
            (section && section === "edit" ? <EditProject project={project} setShowDetails={setShowDetails} /> : <ProjectDetails project={project} setShowDetails={setShowDetails} intersection={intersection} />) :
            <ButtonContainer>
                <PageTitle>Projects 
                <ThemButton
                type="primary"
                className={"createProject"}
                size={"medium"}
                icon={<PlusCircleOutlined />}
                onClick={() => router.push("projects/create")}
                >
                Create Project
                </ThemButton>
                    </PageTitle>
                <Row gutter={[50, 10]}>
                    <Col md={24} lg={24}>
                        <SearchProject setProject={setProject} setShowDetails={setShowDetails} setSection={setSection} setInterSection={setInterSection} />
                    </Col>
                </Row>
            </ButtonContainer>}
    </div>
}

export default Projects