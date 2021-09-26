import react, { useEffect, useState } from "react"

import styled from "styled-components";
import { Button, Row, Col, notification } from "antd";
import SearchProject from "../../src/components/searchProject";
import { PageTitle, ThemButton } from "../../src/components/styleds";
import ProjectDetails from "../../src/components/projectDetails";
import EditProject from "../../src/components/editProject"
import { PlusCircleOutlined } from '@ant-design/icons';
import { formRequest } from "../../src/requests";
const ButtonContainer = styled.div`
    padding: 10px;
`;

import { useSelector } from "react-redux";
import { getUser } from "../../src/store/actions/UserSlice";
import { useRouter } from "next/router";

function Projects() {
    const router = useRouter();
    const { role } = useSelector(getUser);

    useEffect(() => {
        if (![1, 3, 4].includes(role.id)) {
            router.push("deny");
        }
    }, []);

    return (
        <ButtonContainer>
            <PageTitle>Projects
                <ThemButton
                    type="primary"
                    className={"createProject"}
                    size={"medium"}
                    icon={<PlusCircleOutlined />}
                    disabled={role.id !== 1 && role.id !== 3}
                    onClick={() => router.push("projects/create")}
                >
                    Create Project
                </ThemButton>
            </PageTitle>
            <Row gutter={[50, 10]}>
                <Col md={24} lg={24}>
                    <SearchProject />
                </Col>
            </Row>
        </ButtonContainer>
    );
}

export default Projects