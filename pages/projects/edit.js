import react, { useEffect, useState } from "react"

import EditProject from "../../src/components/editProject";
import { getUser } from "../../src/store/actions/UserSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function Projects() {

    const router = useRouter();
    const { role } = useSelector(getUser);


    useEffect(() => {
        if (![1, 3].includes(role.id)) {
            if (role.id === 4) {
                router.push("/projects");
            } else {
                router.push("deny");
            }
        }
    }, []);

    return <EditProject />
}

export default Projects