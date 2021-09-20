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

import { useSelector } from "react-redux";
import { getUser } from "../../src/store/actions/UserSlice";
import { useRouter } from "next/router";

function Projects() {

    const router = useRouter();
    const { role } = useSelector(getUser);
    const [showDetails, setShowDetails] = useState(false)
    const [section, setSection] = useState("");
    const [project, setProject] = useState("");
    const [intersection, setInterSection] = useState({});

    useEffect(() => {
        if (role.id !== 1 && role.id !== 3 && role.id !== 4) {
            router.push("deny");
        }
      }, []);

    return <div>
        {showDetails ?
            ((role.id === "1" || role.id === "3") && section && section === "edit" ?
            <EditProject project={project} setShowDetails={setShowDetails} /> :
            <ProjectDetails project={project} setShowDetails={setShowDetails} intersection={intersection} />) :
            <ButtonContainer>
                <PageTitle>Projects 
                <ThemButton
                type="primary"
                className={"createProject"}
                size={"medium"}
                icon={<PlusCircleOutlined />}
                disabled={role.id !== "1" && role.id !== "3"}
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