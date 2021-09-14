import react, { useEffect, useState, createRef } from "react"
import styled from "styled-components"
import {Table, Button, Tooltip, Modal, Tabs, Checkbox, notification} from "antd"
import { LeftCircleOutlined } from '@ant-design/icons';
import {PageTitle, TableContainer} from "./styleds"
import { DownloadOutlined } from '@ant-design/icons';
import {request} from "../requests"
import { PDFExport } from '@progress/kendo-react-pdf';
const { TabPane } = Tabs;
const Wrapper = styled.div`
    padding: 10px;
`
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
    title: 'NAME',
    dataIndex: 'TREATMENT_NAME',
    align: 'left',
  },
  {
    title: 'TYPE',
    dataIndex: 'TREATMENT_TYPE',
    align: 'left',
  },
  {
    title: 'SERVICE LIFE',
    dataIndex: 'SERVICE_LIFE',
    align: 'left',
  },
  {
    title: 'CRF',
    dataIndex: 'CRF',
    align: 'left',
  },
  {
    title: 'CMF',
    dataIndex: 'CMF',
    align: 'left',
  },
  {
    title: 'Add',
    dataIndex: 'add',
    align: 'left',
  },
]
const projectTreatmentColumns = [ 
  {
    title: 'NAME',
    dataIndex: 'TREATMENT_NAME',
    align: 'left',
  },
  {
    title: 'TYPE',
    dataIndex: 'TREATMENT_TYPE',
    align: 'left',
  },
  {
    title: 'SERVICE LIFE',
    dataIndex: 'SERVICE_LIFE',
    align: 'left',
  },
  {
    title: 'CRF',
    dataIndex: 'CRF',
    align: 'left',
  },
  {
    title: 'CMF',
    dataIndex: 'CMF',
    align: 'left',
  },
  {
    title: 'Remove',
    dataIndex: 'remove',
    align: 'left',
  },
]
function ProjectDetails({project, setShowDetails, intersection}){
  console.log(project)
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [treatments, setTreatments] = useState()
  const [addTreatCheckBox, setAddTreatCheckBox] = useState(false)
  const [newTreatments, setNewTreatments] = useState()
  const [projectTreatments, setProjectTreatments] = useState()
  const [deleteListTreats, setDeleteListTreats] = useState()
let newTreats = []

  const showModal = () => {
    loadTreatments()
    setVisible(true);
  };


  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  console.log(project)
  const [details, setDetails] = useState()
  const setCrash = () =>{
    let a=0;
    let b=0;
    let c=0;
    let injuries =0;
    let fatalities=0;
    let pdo=0;
    intersection && intersection?.crash_intersections.map((crash) => {
      a += parseInt(crash.NUMBER_OF_A_INJURIES)
      b += parseInt(crash.NUMBER_OF_B_INJURIES)
      c += parseInt(crash.NUMBER_OF_C_INJURIES)
      injuries += parseInt(crash.NUMBER_OF_INJURIES)
      fatalities += parseInt(crash.NUMBER_OF_FATALITIES)
      pdo += parseInt(crash.NUMBER_OF_PDO)
      
    })
   return {a, b, c, injuries, fatalities, pdo}
  }

  const setProjectDetails = () =>{
    project && setDetails([
      {field: <b>{"Project Name"}</b>, value: project.PROJECT_NAME},
      {field: <b>{"Project Number"}</b>, value: project.PROJECT_NUMBER},
      {field: <b>{"Project Status"}</b>, value: project.PROJECT_STATUS},
      {field: <b>{"Intersection"}</b>, value: project.INTERSECTION?.INTERSECTION_NAME},
      {field: <b>{"Ben_Cost"}</b>, value: project.BEN_COST},
      {field: <b>{"Crash Count"}</b>, value: project.CRASH_COUNT},
      {field: <b>{"Crash Start Date"}</b>, value: project.CRASH_START_DATE},
      {field: <b>{"Crash End Date"}</b>, value: project.CRASH_END_DATE},
      {field: <b>{"Crash Rate AADT"}</b>, value: project.CRASH_RATE_AADT},
      {field: <b>{"EPDO"}</b>, value: project.EPDO},
      {field: <b>{"EUAB"}</b>, value: project.EUAB},
      {field: <b>{"EUAC"}</b>, value: project.EUAC},
      {field: <b>{"Number of A injuries"}</b>, value: setCrash().a},
      {field: <b>{"Number of B injuries"}</b>, value: setCrash().b},
      {field: <b>{"Number of C injuries"}</b>, value: setCrash().c},
      {field: <b>{"Number of Fatalities"}</b>, value: setCrash().fatalities},
      {field: <b>{"Number of Injuries"}</b>, value: setCrash().injuries},
      {field: <b>{"Number of PDO"}</b>, value: setCrash().pdo},
      {field: <b>{"Program Name"}</b>, value: project.PROGRAM_NAME},
      {field: <b>{"Program Number"}</b>, value: project.PROGRAM_NUMBER},
      {field: <b>{"Project Auth Date"}</b>, value: project.PROJECT_AUTH_DATE},
      {field: <b>{"Project Comp Date"}</b>, value: project.PROJECT_COMP_DATE},
      {field: <b>{"Project Start Date"}</b>, value: project.PROJECT_START_DATE},
      {field: <b>{"Project End Date"}</b>, value: project.PROJECT_END_DATE},
      {field: <b>{"Project Sub Phase"}</b>, value: project.PROJECT_SUBPHASE},
      {field: <b>{"Countermeasures"}</b>, value: <Tooltip title="Countermeasures can be added by clicking" placement="top"><a onClick={showModal}>{project.treatments?.length}</a></Tooltip>}
    ])
  }
  const  handleExportWithComponent  = (event) => {
    pdfExportComponent.current.save();
}
const pdfExportComponent = createRef()
const loadTreatments = async () => {
  const res = await request(`/treatments`, {
      method: "GET",
    });
    if(res.status === 200)
    {
      console.log("treatments", res.data)
      setTreatments(res.data && res.data.map((treat, index) => {
        return {
          TREATMENT_NAME: treat.TREATMENT_NAME,
          TREATMENT_TYPE: treat.TREATMENT_TYPE,
          SERVICE_LIFE: treat.SERVICE_LIFE,
          CRF: treat.CRF,
          CMF: treat.CMF,
          add: <Checkbox key={index} onChange={(e) => addTreat(e, treat)} />
        }
      }))
      
    }
}

const addTreat = (e, treat) =>{
    if(e.target.checked)
    {
      if ((!project.treatments.filter(function(ee) { return ee.id === treat.id; }).length > 0) && !newTreats.filter(function(ee) { return ee.id === treat.id; }).length > 0) {
        newTreats.push(treat)
      }
      console.log("new Treats", newTreats)
    }
    else{
      if (newTreats.filter(function(ee) { return ee.id === treat.id; }).length > 0) {
        var index = newTreats.indexOf(treat);
        newTreats.splice(index, 1);
        }
      console.log("new Treats", newTreats)
  
    }
      setNewTreatments(newTreats)
  
}
const removeTreat = (e, treat) => {
  const removeTreat = project.treatments.filter((treatment) => treatment.id !== treat.id);
  if(removeTreat.length === 0)
  setDeleteListTreats("empty");
  else
  setDeleteListTreats(removeTreat);
}
const handleOk = async () => {
  // setConfirmLoading(true);
  if(newTreatments?.length > 0)
  {
    newTreatments.map((tr) => {
      project.treatments.push(tr)
      console.log("ushing")
    })
    await request(`projects/${project.id}`, {
      method: "PUT",
      data: project,
    }).then((res) => {
      if(res.status === 200)
      {
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
  else
  {
    notification["error"]({
      duration: 5,
      message: "Select a Treatment or the same Treatment may already added",
    })
  }
  
};
const handleRemove = async () =>{
  // setConfirmLoading(true);
  console.log("remove called")
  if(deleteListTreats?.length > 0 || deleteListTreats === "empty")
  {
    if(deleteListTreats === "empty"){
      project.treatments = []
    }
    else{
      deleteListTreats.map((tr) => {
        var index = project.treatments.indexOf(tr);
        project.treatments.splice(index, 1);
      })
    }
   
    await request(`projects/${project.id}`, {
      method: "PUT",
      data: project,
    }).then((res) => {
      if(res.status === 200)
      {
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
  else
  {
    notification["error"]({
      duration: 5,
      message: "There was an error ",
    })
  }
  
}
  useEffect(()=>{
    setProjectDetails()
    setProjectTreatments(project.treatments && project.treatments.map((treat, index) => {
      return {
        TREATMENT_NAME: treat.TREATMENT_NAME,
        TREATMENT_TYPE: treat.TREATMENT_TYPE,
        SERVICE_LIFE: treat.SERVICE_LIFE,
        CRF: treat.CRF,
        CMF: treat.CMF,
        remove: <Checkbox key={index} onChange={(e) => removeTreat(e, treat)} />
      }
    }))
      }, [])
    return <><Wrapper>
            <PageTitle> <LeftCircleOutlined className={"backButton"} onClick={() => setShowDetails(false)} />Project Details
              <Button
                type="primary"
                className={"downloadButton"}
                size={"medium"}
                icon={<DownloadOutlined />}
                onClick={handleExportWithComponent}
                >
                Download
              </Button>
            </PageTitle>

              <TableContainer style={{width: "380px", margin: "auto"}}>
              <PDFExport  ref={pdfExportComponent}  paperSize="A4">
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
              width={700}
            >
                <Tabs defaultActiveKey="1">
                <TabPane tab="Countermeasures" style={{textAlign: "center"}} key="1">
                {treatments && <Table pagination={false} columns={projectTreatmentColumns} dataSource={projectTreatments && projectTreatments}/>}
                <Button style={{marginTop: "10px"}} type={"danger"} onClick={handleRemove}>Remove</Button>
                </TabPane>
                <TabPane tab="Treatments" style={{textAlign: "center"}} key="2">
                {treatments && <Table pagination={false} columns={modalTableColumns} dataSource={treatments && treatments}/>}
                <Button style={{marginTop: "10px"}} type={"primary"} onClick={handleOk}>Add Treatment</Button>
                </TabPane>
              </Tabs>
            </Modal>
            </>
}
export default ProjectDetails