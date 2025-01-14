import react, { useEffect, useState, createRef } from "react";
import { Table, Button, Tooltip, Modal, Tabs, Checkbox, notification } from "antd";
import { LeftCircleOutlined } from '@ant-design/icons';
import { PageTitle, TableContainer, ThemButton } from "./styleds";
import { DownloadOutlined } from '@ant-design/icons';
import { formRequest } from "../requests"
import { PDFExport } from '@progress/kendo-react-pdf';
import styled from "styled-components";
import { useRouter } from "next/router";
import numeral from "numeral";
import { useSelector } from "react-redux";
import {getUser} from "../store/actions/UserSlice";

import { columns, projectTreatmentColumns, modalTableColumns } from "../constants/projectDetailsConstants"

const { TabPane } = Tabs;
const BASE_URL = process.env.BASE_URL
const Wrapper = styled.div`
    padding: 10px;
`;

import { firstCounter, getCalculatedData, numberOfCrashes } from "../utils/calculations";
import { useGetIntersectionsQuery } from "../store/query";

let tereats = {}, selectedTreatsRemove = {}, selectedTreatsAdd = {};
function ProjectDetails({ crashCostList, project, intersection }) {

  const router = useRouter();
  const { role } = useSelector(getUser);
  const [details, setDetails] = useState([]);
  const [visible, setVisible] = useState(false);
  const [treatments, setTreatments] = useState([]);
  const [projectTreatments, setProjectTreatments] = useState([]);
  const { data: crashCosts } = useGetIntersectionsQuery("Crash-costs");
  const tData = useGetIntersectionsQuery("treatments");
  const prujects = useGetIntersectionsQuery("projects");
  tereats = tData;

  useEffect(() => {
    crashCostList && setProjectDetails()
    setProjectTreatments(project.treatments && project.treatments.map((treat, index) => {
      return {
        id: treat.id,
        TREATMENT_NAME: treat.TREATMENT_NAME,
        TREATMENT_TYPE: treat.TREATMENT_TYPE,
        SERVICE_LIFE: treat.SERVICE_LIFE,
        CRF: treat.CRF, CMF: treat.CMF,
        SALVAGE_PERCENT: treat.SALVAGE_PERCENT,
        INTEREST_RATE: treat.INTEREST_RATE,
        TOTAL_TREATMENT_COST: numeral(treat.TOTAL_TREATMENT_COST).format("$0,0.00"),
        OM_COST: numeral(treat.OM_COST).format("$0,0"),
        TREATMENT_COST: numeral(treat.TREATMENT_COST).format("$0,0"),
        remove: <Checkbox key={index} onChange={(e) => removeTreat(e, treat)} />
      }
    }));

    return () => { project = {} }

  }, []);

  const showModal = async () => {
    await loadTreatments();
    setVisible(true);
    selectedTreatsAdd = {};
    selectedTreatsRemove = {};
  };

  const handleCancel = () => {
    setVisible(false);
    selectedTreatsAdd = {};
    selectedTreatsRemove = {};
  };

  const setProjectDetails = () => {
    project && setDetails([
      { id: "1", field: <b>{"Project Name"}</b>, value: project.PROJECT_NAME },
      { id: "2", field: <b>{"Project Number"}</b>, value: project.PROJECT_NUMBER },
      { id: "3", field: <b>{"Project Status"}</b>, value: project.PROJECT_STATUS },
      { id: "4", field: <b>{"Intersection"}</b>, value: project.INTERSECTION?.INTERSECTION_NAME },
      { id: "5", field: <b>{"B/C"}</b>, value: project.BEN_COST },
      { id: "6", field: <b>{"Crash Count"}</b>, value: project.CRASH_COUNT },
      { id: "7", field: <b>{"Crash Start Date"}</b>, value: project.CRASH_START_DATE },
      { id: "8", field: <b>{"Crash End Date"}</b>, value: project.CRASH_END_DATE },
      { id: "9", field: <b>{"Crash Rate AADT"}</b>, value: project.CRASH_RATE_AADT },
      { id: "10", field: <b>{"EPDO"}</b>, value: project.EPDO },
      { id: "11", field: <b>{"EUAB"}</b>, value: numeral(project.EUAB).format("$0,0.00") },
      { id: "12", field: <b>{"EUAC"}</b>, value: numeral(project.EUAC).format("$0,0.00") },
      { id: "13", field: <b>{"Number of A injuries"}</b>, value: project.NUMBER_OF_A_INJURIES },
      { id: "14", field: <b>{"Number of B injuries"}</b>, value: project.NUMBER_OF_B_INJURIES },
      { id: "15", field: <b>{"Number of C injuries"}</b>, value: project.NUMBER_OF_C_INJURIES },
      { id: "16", field: <b>{"Number of Fatalities"}</b>, value: project.NUMBER_OF_FATALITIES },
      { id: "17", field: <b>{"Number of Injuries"}</b>, value: project.NUMBER_OF_INJURIES },
      { id: "18", field: <b>{"Number of PDO"}</b>, value: project.NUMBER_OF_PDO },
      { id: "19", field: <b>{"Program Name"}</b>, value: project.PROGRAM_NAME },
      { id: "20", field: <b>{"Program Number"}</b>, value: project.PROGRAM_NUMBER },
      { id: "21", field: <b>{"Project Auth Date"}</b>, value: project.PROJECT_AUTH_DATE },
      { id: "22", field: <b>{"Project Comp Date"}</b>, value: project.PROJECT_COMP_DATE },
      { id: "23", field: <b>{"Project Start Date"}</b>, value: project.PROJECT_START_DATE },
      { id: "24", field: <b>{"Project End Date"}</b>, value: project.PROJECT_END_DATE },
      { id: "25", field: <b>{"Project Sub Phase"}</b>, value: project.PROJECT_SUBPHASE },
      { id: "26", field: <b>{"Countermeasures"}</b>, value: <Tooltip title="Countermeasures can be added by clicking" placement="top"><a onClick={showModal} style={{ textDecoration: "underline", color: "blue" }}>{project.treatments?.length ? project.treatments?.length : 0}</a></Tooltip> }
    ])
  }

  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  };

  const pdfExportComponent = createRef();

  const loadTreatments = async () => {
    try {
      if (tereats.data && tereats.data.length) {
        setTreatments(tereats.data.map((treat, index) => {
          return {
            id: treat.id,
            TREATMENT_NAME: treat.TREATMENT_NAME,
            TREATMENT_TYPE: treat.TREATMENT_TYPE,
            SERVICE_LIFE: treat.SERVICE_LIFE,
            CRF: treat.CRF, CMF: treat.CMF,
            SALVAGE_PERCENT: treat.SALVAGE_PERCENT,
            INTEREST_RATE: treat.INTEREST_RATE,
            TOTAL_TREATMENT_COST: numeral(treat.TOTAL_TREATMENT_COST).format("$0,0.00"),
            OM_COST: numeral(treat.OM_COST).format("$0,0"),
            TREATMENT_COST: numeral(treat.TREATMENT_COST).format("$0,0"),
            add: <Checkbox key={index} onChange={(e) => addTreat(e, treat)} />
          }
        }))
      }
    } catch (e) {
      notification["error"]({
        duration: 5,
        message: e,
      })
    }

  };

  const addTreat = (e, treat) => {
    selectedTreatsAdd = {
      ...selectedTreatsAdd,
      [treat.id]: e.target.checked
    }
  };


  const removeTreat = (e, treat) => {
    selectedTreatsRemove = {
      ...selectedTreatsRemove,
      [treat.id]: e.target.checked
    }
  };

  const computing = treatments => {

    const crashes = numberOfCrashes(
      intersection.crash_intersections ? intersection.crash_intersections : [],
      project.CRASH_START_DATE, project.CRASH_END_DATE
    );

    const { a, b, c, injuries, fatalities, pdo, epdo, crashRate, years } = firstCounter({
      crashes, CRASH_COUNT: crashes.length, AADT: intersection.AADT,
      CRASH_END_DATE: project.CRASH_END_DATE,
      CRASH_START_DATE: project.CRASH_START_DATE
    });

    let fCrashCost = crashCosts.find(cos => cos.crashSeverity === "Fatal").crashCost;
    let iCrashCost = crashCosts.find(cos => cos.crashSeverity === "Injury").crashCost;
    let pCrashCost = crashCosts.find(cos => cos.crashSeverity === "PDO").crashCost;

    const { EUAC, EUAB, BEN_COST } = getCalculatedData({
      injuries, fatalities, pdo, years,
      fCrashCost, iCrashCost, pCrashCost, treatments,
      AADT_GROWTH_FACTOR: intersection.AADT_GROWTH_FACTOR,
    });

    return {
      ...project,
      CRASH_COUNT: crashes.length,
      EPDO: epdo, EUAB, EUAC, BEN_COST,
      NUMBER_OF_FATALITIES: fatalities,
      NUMBER_OF_INJURIES: injuries,
      NUMBER_OF_PDO: pdo,
      CRASH_RATE_AADT: crashRate,
      NUMBER_OF_A_INJURIES: a,
      NUMBER_OF_B_INJURIES: b,
      NUMBER_OF_C_INJURIES: c
    };

  }

  const handleOk = async () => {

    if (!Array.isArray(tereats.data)) return;

    let checkOldArr = project.treatments && Array.isArray(project.treatments);

    if(checkOldArr){
      project.treatments.forEach(tr => {
        if(selectedTreatsAdd[tr.id] !== undefined){
          delete selectedTreatsAdd[tr.id];
        }
      });
    }

    let trts = tereats.data.filter(tr => selectedTreatsAdd[tr.id] === true), values;

    if (checkOldArr) {
      values = computing([...trts, ...project.treatments]);
    } else {
      values = computing(trts);
    }

    if (trts?.length > 0) {
      trts.forEach((tr) => {
        values.treatments.push(tr)
      });
      try {
        const update = await formRequest(`projects/${values.id}`, {
          method: "PUT",
          data: values
        });
        if (update.status === 200) {
          router.push("/projects");
          notification["success"]({
            duration: 5, message: "Treatment Added",
          });
          tereats.refetch();
          prujects.refetch();
        }
      } catch (e) {
        notification["error"]({
          duration: 5,
          message: e,
        });
      }
    } else {
      notification["error"]({
        duration: 5,
        message: "Select a Treatment or the same Treatment may already added"
      })
    }

  };

  const handleRemove = async () => {
    try {

      let trts = project.treatments.filter(tr => !selectedTreatsRemove[tr.id]);
      let values = computing(trts);
      const update = await formRequest(`projects/${values.id}`, {
        method: "PUT", data: { ...values, treatments: trts }
      });

      if (update.status === 200) {
        router.push("/projects");
        notification["success"]({
          duration: 5,
          message: "Treatment Removed",
        });
        tereats.refetch();
        prujects.refetch();
      }

    } catch (e) {
      notification["error"]({
        duration: 5,
        message: "There was an error ",
      })
    }
  }

  return (
    <>
      <Wrapper>
        <PageTitle> <LeftCircleOutlined className={"backButton"} onClick={() => router.push("/projects")} />Project Details
          <ThemButton
            type="primary"
            className={"downloadButton"}
            size={"medium"}
            icon={<DownloadOutlined />}
            onClick={handleExportWithComponent}
          >
            Download Project Details
          </ThemButton>
          {
            project.projectFile?.url && <a rel="noopener noreferrer" target="_blank" href={`${BASE_URL}${project.projectFile?.url}`}>
              <ThemButton type={"primary"} icon={<DownloadOutlined />} htmlType={"button"} size={"medium"} className={"downloadButton"}>Download Attachments</ThemButton>
            </a>
          }
        </PageTitle>

        <TableContainer style={{ maxWidth: "450px", margin: "auto" }}>
          <PDFExport ref={pdfExportComponent} paperSize="A4">
            <Table rowKey="id" pagination={false} columns={columns} dataSource={details} tableLayout={"horizontal"} />
          </PDFExport>
        </TableContainer>
      </Wrapper>
      {
        visible &&
        <Modal
          title="Add Treatment"
          visible={visible}
          loading={true}
          onCancel={handleCancel}
          footer={false}
          width={1200}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Countermeasures" style={{ textAlign: "center" }} key="1">
              {treatments && <Table rowKey="id" pagination={false} columns={projectTreatmentColumns} dataSource={projectTreatments} />}
              {project.PROJECT_STATUS !== "Completed" && <Button disabled={role.id !== 1 && role.id !== 3} style={{ marginTop: "10px" }} type={"danger"} onClick={handleRemove}>Remove</Button>}
            </TabPane>
            <TabPane tab="Treatments" style={{ textAlign: "center" }} key="2">
              {treatments && <Table rowKey="id" pagination={false} columns={modalTableColumns} dataSource={treatments} />}
              {project.PROJECT_STATUS !== "Completed" && <Button disabled={role.id !== 1 && role.id !== 3} style={{ marginTop: "10px" }} type={"primary"} onClick={handleOk}>Add Treatment</Button>}
            </TabPane>
          </Tabs>
        </Modal>
      }
    </>
  )
}
export default ProjectDetails