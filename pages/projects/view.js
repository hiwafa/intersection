import react, { useEffect, useState } from "react"

import { notification } from "antd";
import ProjectDetails from "../../src/components/projectDetails";
import { formRequest } from "../../src/requests";

import { useSelector } from "react-redux";
import { getUser } from "../../src/store/actions/UserSlice";
import { useRouter } from "next/router";

function Projects() {

    const router = useRouter();
    const { role } = useSelector(getUser);
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

    return  <ProjectDetails crashCostList={crashCostList} />;
}

export default Projects