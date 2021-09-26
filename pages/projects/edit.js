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
    const [showDetails, setShowDetails] = useState(false)
    const [section, setSection] = useState("");
    const [project, setProject] = useState("");
    const [intersection, setInterSection] = useState({});
    const [crashCostList, setCrashCostsList] = useState()

    const loadCrashCost = async () => {
        try {
            const crashCosts = await formRequest('crash-costs', { method: "GET" });
            if (crashCosts.status === 200) {
                setCrashCostsList(crashCosts.data)
            }
        } catch (e) {
            notification["error"]({
                duration: 5,
                message: e,
            })
        }
    };

    useEffect(() => {
        loadCrashCost();
        if (![1, 3, 4].includes(role.id)) {
            router.push("deny");
        }
    }, []);

    return <EditProject project={project} setShowDetails={setShowDetails} />
}

export default Projects