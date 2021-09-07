import react, { useState } from "react"
import styled from "styled-components"
import {Button, Row, Col} from "antd"
import CreateProject from "../components/createProject"

const ButtonContainer = styled.div`
    padding: 10px;
`
function Projects(){
    const [search, setSearch] = useState(false)
    const handleClick = (status) => {
        setSearch(status)
    }
    return <>
        <ButtonContainer>
            <h3>Projects</h3>
            <Row gutter={[50, 10]}>
                <Col md={12} lg={12}><Button onClick={() => handleClick(true)} size={"large"} type={"primary"} block>Search Projects</Button></Col>
                <Col md={12} lg={12}><Button onClick={() => handleClick(false)} size={"large"} type={"primary"} block>Create Projects</Button></Col>
                <Col md={24} lg={24}>
                    {search ? <div>search</div> : <CreateProject />}
                </Col>
            </Row>
        </ButtonContainer>
            </>
}

export default Projects