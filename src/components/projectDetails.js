import react, { useEffect, useState, createRef } from "react"
import styled from "styled-components"
import { Table, Button, Tooltip, Modal, Tabs, Checkbox, notification } from "antd"
import { LeftCircleOutlined } from '@ant-design/icons';
import { PageTitle, TableContainer, ThemButton } from "./styleds"
import { DownloadOutlined } from '@ant-design/icons';
import { request } from "../requests"
import { PDFExport } from '@progress/kendo-react-pdf';
import moment from "moment"
import numeral, { isNumeral } from "numeral"
const { TabPane } = Tabs;
const BASE_URL = process.env.BASE_URL
const Wrapper = styled.div`
    padding: 10px;
`
import { useSelector } from "react-redux";
import { getUser } from "../store/actions/UserSlice";


const columns = [
  {
    title: 'Field',
    dataIndex: 'field',
    align: 'left',
  },

  {
    title: 'Value',
    dataIndex: 'value',
    align: 'left',
  }
];
const modalTableColumns = [
  {
    title: 'Name',
    dataIndex: 'TREATMENT_NAME',
    align: 'center',
  },
  {
    title: 'Type',
    dataIndex: 'TREATMENT_TYPE',
    align: 'center',
  },
  {
    title: 'Service Live',
    dataIndex: 'SERVICE_LIFE',
    align: 'center',
  },
  {
    title: 'CRF',
    dataIndex: 'CRF',
    align: 'center',
  },
  {
    title: 'CMF',
    dataIndex: 'CMF',
    align: 'center',
  },
  {
    title: 'Salvage Percent',
    dataIndex: 'SALVAGE_PERCENT',
    align: 'center',
  },
  {
    title: 'Interest Rate',
    dataIndex: 'INTEREST_RATE',
    align: 'center',
  },
  {
    title: 'Total Treatment Cost',
    dataIndex: 'TOTAL_TREATMENT_COST',
    align: 'center',
  },
  {
    title: 'OM Cost',
    dataIndex: 'OM_COST',
    align: 'center',
  },
  {
    title: 'Treatment Cost',
    dataIndex: 'TREATMENT_COST',
    align: 'center',
  },
  {
    title: 'Add',
    dataIndex: 'add',
    align: 'center',
  },
]
const projectTreatmentColumns = [
  {
    title: 'Name',
    dataIndex: 'TREATMENT_NAME',
    align: 'center',
  },
  {
    title: 'Type',
    dataIndex: 'TREATMENT_TYPE',
    align: 'center',
  },
  {
    title: 'Service Life',
    dataIndex: 'SERVICE_LIFE',
    align: 'center',
  },
  {
    title: 'CRF',
    dataIndex: 'CRF',
    align: 'center',
  },
  {
    title: 'CMF',
    dataIndex: 'CMF',
    align: 'center',
  },
  {
    title: 'Salvage Percent',
    dataIndex: 'SALVAGE_PERCENT',
    align: 'center',
  },
  {
    title: 'Interest Rate',
    dataIndex: 'INTEREST_RATE',
    align: 'center',
  },
  {
    title: 'Total Treatment Cost',
    dataIndex: 'TOTAL_TREATMENT_COST',
    align: 'center',
  },
  {
    title: 'OM Cost',
    dataIndex: 'OM_COST',
    align: 'center',
  },
  {
    title: 'Treatment Cost',
    dataIndex: 'TREATMENT_COST',
    align: 'center',
  },
  {
    title: 'Remove',
    dataIndex: 'remove',
    align: 'center',
  },
]
function ProjectDetails({ project, setShowDetails, intersection }) {

  const { role } = useSelector(getUser);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [treatments, setTreatments] = useState()
  const [addTreatCheckBox, setAddTreatCheckBox] = useState(false)
  const [newTreatments, setNewTreatments] = useState()
  const [projectTreatments, setProjectTreatments] = useState()
  const [deleteListTreats, setDeleteListTreats] = useState()
  const [crashCostList, setCrashCostsList] = useState()
  const crashCost = async (severity) => {
    let value = ""
    crashCostList && crashCostList.map((cost) => {
      if (cost.crashSeverity === severity) {
        value = cost.crashCost;
      }
    })
    return value
  }
  let newTreats = []

  const showModal = () => {
    loadTreatments()
    setVisible(true);
  };


  const handleCancel = () => {
    setVisible(false);
  };
  const [details, setDetails] = useState()
  const setCrash = () => {
    let a = 0;
    let b = 0;
    let c = 0;
    let injuries = 0;
    let fatalities = 0;
    let pdo = 0;
    let epdo = 0
    let crashRate = 0;
    let dates = []
    let crashCosts = 0.0;
    intersection.crash_intersections && intersection.crash_intersections.map((crash) => {
      dates.push(crash.DATE_OF_CRASH)
      a += parseInt(crash.NUMBER_OF_A_INJURIES)
      b += parseInt(crash.NUMBER_OF_B_INJURIES)
      c += parseInt(crash.NUMBER_OF_C_INJURIES)
      injuries += parseInt(crash.NUMBER_OF_INJURIES)
      fatalities += parseInt(crash.NUMBER_OF_FATALITIES)
      pdo += parseInt(crash.NUMBER_OF_PDO)
      crashCosts += crashCost(crash.SEVERITY)
    })
    const NumberOfCrashes = intersection.crash_intersections ? intersection.crash_intersections.length : 0;
    let sortedDate = dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    let last = moment(sortedDate[0])
    let first = moment(sortedDate[sortedDate.length - 1])
    const yearsDiff = last.diff(first, "years")

    let endDate = moment(project.PROJECT_END_DATE)
    let startDate = moment(project.PROJECT_START_DATE)
    if (startDate !== undefined && endDate !== undefined) {
      const months = parseInt(endDate.diff(startDate, "months")) > 0 ? parseInt(endDate.diff(startDate, "days")) / 12 : (parseInt(endDate.diff(startDate, "days")) / 30) / 12
      crashRate = (parseInt(intersection?.crash_intersections?.length) * Math.pow(10, 6)) / (months * 365 * parseInt(intersection && intersection.AADT))
      console.log("fuck", (months * 365 * parseInt(intersection && intersection.AADT)))
    }
    epdo = 542 * fatalities + 11 * injuries + 1 * pdo;

    return { a, b, c, injuries, fatalities, pdo, epdo, crashRate, yearsDiff, NumberOfCrashes, crashCosts }
  }
  const loadCrashCost = async () => {
    const costs = await request('crash-costs', {
      method: "GET"
    });
    if (costs.status === 200) {
      setCrashCostsList(costs.data)
    }
    return
  }
  const calculateTreatments = () => {
    let i = 0.0; // interest rate 
    let Cest = 0.0; // estimated total cost
    let Sper = 0.0; // estimated salvage percent
    let l = 0; // service life in years
    let cr = 0.0// capital recovery
    let sf = 0.0 // sinking fund
    let sv = 0.0 // salvage value
    let EUAC = 0.0;

    let aadt = intersection && intersection.AADT;
    let years = setCrash().yearsDiff;
    let n = years > 0 ? years : 1;
    let cf = setCrash().NumberOfCrashes
    let m = project.treatments ? project.treatments.length : 0;
    let cc = setCrash().crashCosts;
    let crf = 1 //
    let crb = 0.0
    let b = 0.0;
    let EUAB = 0.0;
    project.treatments && project.treatments.map((treat) => {
      // calculating EUAC

      i = parseFloat(treat.INTEREST_RATE);
      Cest = parseFloat(treat.TOTAL_TREATMENT_COST);
      Sper = parseFloat(treat.SALVAGE_PERCENT);
      l = parseInt(treat.SERVICE_LIFE);
      cr = (i * Math.pow(1 + i, l)) / (Math.pow(1 + i, l) - 1)
      sv = Cest * Sper;
      sf = i / (Math.pow(1 + i, l) - 1)
      EUAC += (Cest * cr) - (sv * sf)

      //calculating EUAB
      crf *= (1 - parseFloat(treat.CRF))
    })
    crf = 1 - crf;
    aadt = (1 + Math.pow(aadt, n));
    crf = aadt * crf;

    crb = cf * crf;

    crb = cc * crb;

    b = crb;
    EUAB = (b / n);
    EUAC = EUAC.toFixed(3)
    const BEN_COST = (EUAB / EUAC).toFixed(3);
    return { EUAC, EUAB, BEN_COST }
  }
  const setProjectDetails = () => {
    project && setDetails([
      { field: <b>{"Project Name"}</b>, value: project.PROJECT_NAME },
      { field: <b>{"Project Number"}</b>, value: project.PROJECT_NUMBER },
      { field: <b>{"Project Status"}</b>, value: project.PROJECT_STATUS },
      { field: <b>{"Intersection"}</b>, value: project.INTERSECTION?.INTERSECTION_NAME },
      { field: <b>{"B/C"}</b>, value: isNaN(calculateTreatments().BEN_COST) ? "" : numeral(calculateTreatments().BEN_COST).format("0,0.00") },
      { field: <b>{"Crash Count"}</b>, value: intersection?.crash_intersections?.length },
      { field: <b>{"Crash Start Date"}</b>, value: project.CRASH_START_DATE },
      { field: <b>{"Crash End Date"}</b>, value: project.CRASH_END_DATE },
      { field: <b>{"Crash Rate AADT"}</b>, value: setCrash().crashRate.toFixed(2) },
      { field: <b>{"EPDO"}</b>, value: setCrash().epdo },
      { field: <b>{"EUAB"}</b>, value: numeral(calculateTreatments().EUAB).format("$0,0.00") },
      { field: <b>{"EUAC"}</b>, value: numeral(calculateTreatments().EUAC).format("$0,0.00") },
      { field: <b>{"Number of A injuries"}</b>, value: setCrash().a },
      { field: <b>{"Number of B injuries"}</b>, value: setCrash().b },
      { field: <b>{"Number of C injuries"}</b>, value: setCrash().c },
      { field: <b>{"Number of Fatalities"}</b>, value: setCrash().fatalities },
      { field: <b>{"Number of Injuries"}</b>, value: setCrash().injuries },
      { field: <b>{"Number of PDO"}</b>, value: setCrash().pdo },
      { field: <b>{"Program Name"}</b>, value: project.PROGRAM_NAME },
      { field: <b>{"Program Number"}</b>, value: project.PROGRAM_NUMBER },
      { field: <b>{"Project Auth Date"}</b>, value: project.PROJECT_AUTH_DATE },
      { field: <b>{"Project Comp Date"}</b>, value: project.PROJECT_COMP_DATE },
      { field: <b>{"Project Start Date"}</b>, value: project.PROJECT_START_DATE },
      { field: <b>{"Project End Date"}</b>, value: project.PROJECT_END_DATE },
      { field: <b>{"Project Sub Phase"}</b>, value: project.PROJECT_SUBPHASE },
      { field: <b>{"Countermeasures"}</b>, value: <Tooltip title="Countermeasures can be added by clicking" placement="top"><a onClick={showModal} style={{ textDecoration: "underline", color: "blue" }}>{project.treatments?.length ? project.treatments?.length : 0}</a></Tooltip> }
    ])
  }
  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  }
  const pdfExportComponent = createRef()
  const loadTreatments = async () => {
    const res = await request(`/treatments`, {
      method: "GET",
    });
    if (res.status === 200) {
      setTreatments(res.data && res.data.map((treat, index) => {
        return {
          TREATMENT_NAME: treat.TREATMENT_NAME,
          TREATMENT_TYPE: treat.TREATMENT_TYPE,
          SERVICE_LIFE: treat.SERVICE_LIFE,
          CRF: treat.CRF,
          CMF: treat.CMF,
          SALVAGE_PERCENT: treat.SALVAGE_PERCENT,
          INTEREST_RATE: treat.INTEREST_RATE,
          TOTAL_TREATMENT_COST: numeral(treat.TOTAL_TREATMENT_COST).format("$0,0.00"),
          OM_COST: numeral(treat.OM_COST).format("$0,0"),
          TREATMENT_COST: numeral(treat.TREATMENT_COST).format("$0,0"),
          add: <Checkbox key={index} onChange={(e) => addTreat(e, treat)} />
        }
      }))

    }
  }

  const addTreat = (e, treat) => {
    if (e.target.checked) {
      if ((!project.treatments.filter(function (ee) { return ee.id === treat.id; }).length > 0) && !newTreats.filter(function (ee) { return ee.id === treat.id; }).length > 0) {
        newTreats.push(treat)
      }
    }
    else {
      if (newTreats.filter(function (ee) { return ee.id === treat.id; }).length > 0) {
        var index = newTreats.indexOf(treat);
        newTreats.splice(index, 1);
      }
    }
    setNewTreatments(newTreats)

  }
  const removeTreat = (e, treat) => {
    const removeTreat = project.treatments.filter((treatment) => treatment.id !== treat.id);
    if (removeTreat.length === 0)
      setDeleteListTreats("empty");
    else
      setDeleteListTreats(removeTreat);
  }
  const handleOk = async () => {
    // setConfirmLoading(true);
    if (newTreatments?.length > 0) {
      newTreatments.map((tr) => {
        project.treatments.push(tr)
      })
      await request(`projects/${project.id}`, {
        method: "PUT",
        data: project,
      }).then((res) => {
        if (res.status === 200) {
          setShowDetails(false)
          notification["success"]({
            duration: 5,
            message: "Treatment Added",
          })
        }

      }).catch((e) => {
        console.log(e)
      });
    }
    else {
      notification["error"]({
        duration: 5,
        message: "Select a Treatment or the same Treatment may already added",
      })
    }

  };
  const handleRemove = async () => {

    // setConfirmLoading(true);
    if (deleteListTreats?.length > 0 || deleteListTreats === "empty") {
      if (deleteListTreats === "empty") {
        project.treatments = []
      }
      else {
        deleteListTreats.map((tr) => {
          var index = project.treatments.indexOf(tr);
          project.treatments.splice(index, 1);
        })
      }

      await request(`projects/${project.id}`, {
        method: "PUT",
        data: project,
      }).then((res) => {
        if (res.status === 200) {
          setShowDetails(false)
          notification["success"]({
            duration: 5,
            message: "Treatment Removed",
          })
        }
      }).catch((e) => {
        notification["error"]({
          duration: 5,
          message: "There was an error ",
        })
      });
    }
    else {
      notification["error"]({
        duration: 5,
        message: "There was an error ",
      })
    }

  }
  useEffect(() => {
    setProjectDetails()
    loadCrashCost()
    setProjectTreatments(project.treatments && project.treatments.map((treat, index) => {
      return {
        TREATMENT_NAME: treat.TREATMENT_NAME,
        TREATMENT_TYPE: treat.TREATMENT_TYPE,
        SERVICE_LIFE: treat.SERVICE_LIFE,
        CRF: treat.CRF,
        CMF: treat.CMF,
        SALVAGE_PERCENT: treat.SALVAGE_PERCENT,
        INTEREST_RATE: treat.INTEREST_RATE,
        TOTAL_TREATMENT_COST: numeral(treat.TOTAL_TREATMENT_COST).format("$0,0.00"),
        OM_COST: numeral(treat.OM_COST).format("$0,0"),
        TREATMENT_COST: numeral(treat.TREATMENT_COST).format("$0,0"),
        remove: <Checkbox key={index} onChange={(e) => removeTreat(e, treat)} />
      }
    }))
  }, [])
  return <><Wrapper>
    <PageTitle> <LeftCircleOutlined className={"backButton"} onClick={() => setShowDetails(false)} />Project Details
      <ThemButton
        type="primary"
        className={"downloadButton"}
        size={"medium"}
        icon={<DownloadOutlined />}
        onClick={handleExportWithComponent}
      >
        Download Project Details
      </ThemButton>
      {project.projectFile?.url && <a href={`${BASE_URL}${project.projectFile?.url}`}><Button type={"primary"} icon={<DownloadOutlined />} htmlType={"button"} size={"medium"} className={"downloadButton"}>Download Project File</Button></a>}
    </PageTitle>

    <TableContainer style={{ width: "380px", margin: "auto" }}>
      <PDFExport ref={pdfExportComponent} paperSize="A4">
        <Table pagination={false} columns={columns} dataSource={details && details} tableLayout={"horizontal"} />
      </PDFExport>
    </TableContainer>
  </Wrapper>
    <Modal
      title="Add Treatment"
      visible={visible}
      loading={true}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={false}
      width={1200}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Countermeasures" style={{ textAlign: "center" }} key="1">
          {treatments && <Table pagination={false} columns={projectTreatmentColumns} dataSource={projectTreatments && projectTreatments} />}
          {project.PROJECT_STATUS !== "Completed" && <Button disabled={role.id !== 1 && role.id !== 3} style={{ marginTop: "10px" }} type={"danger"} onClick={handleRemove}>Remove</Button>}
        </TabPane>
        <TabPane tab="Treatments" style={{ textAlign: "center" }} key="2">
          {treatments && <Table pagination={false} columns={modalTableColumns} dataSource={treatments && treatments} />}
          {project.PROJECT_STATUS !== "Completed" && <Button disabled={role.id !== 1 && role.id !== 3} style={{ marginTop: "10px" }} type={"primary"} onClick={handleOk}>Add Treatment</Button>}
        </TabPane>
      </Tabs>
    </Modal>
  </>
}
export default ProjectDetails