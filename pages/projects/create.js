import react, { useEffect } from "react"
import styled from "styled-components"
import { Row, Col } from "antd"
import CreateProject from "../../src/components/createProject";
import { useQueryParam } from "../../src/utils/useQueryParam"
const ButtonContainer = styled.div`
    padding: 10px;
`

import { useSelector } from "react-redux";
import { getUser } from "../../src/store/actions/UserSlice";
import { useRouter } from "next/router";

function Projects() {

    const router = useRouter();
    const queryParam = useQueryParam();
    const { role } = useSelector(getUser);

    const handleClick = (status) => router.push("/projects");

    useEffect(() => {

        if (role.id !== 1 && role.id !== 3) {
            if (role.id === 4) {
                router.push("/projects");
            } else {
                router.push("deny");
            }
        }

    }, []);

    useEffect(() => {
        if (queryParam?.create && queryParam?.create == 1) {
            router.push("/projects");
        }
    });

    return (
        <ButtonContainer>
            <Row gutter={[50, 10]}>
                <Col md={24} lg={24}>
                    <CreateProject handleClick={handleClick} />
                </Col>
            </Row>
        </ButtonContainer>
    )
}

export default Projects