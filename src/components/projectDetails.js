import react, { useEffect, useState, createRef } from "react"
import styled from "styled-components"
import {Table, Button, Tooltip, Modal} from "antd"
import { LeftCircleOutlined } from '@ant-design/icons';
import {PageTitle, TableContainer} from "./styleds"
import { DownloadOutlined } from '@ant-design/icons';
import {request} from "../requests"
import { PDFExport } from '@progress/kendo-react-pdf';
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
]
function ProjectDetails({project, setShowDetails, intersection}){
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [treatments, setTreatments] = useState()
  const showModal = () => {
    loadTreatments()
    setVisible(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
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
      {field: <b>{"Countermeasures"}</b>, value: <Tooltip title="Countermeasures can be added by clicking" placement="top"><a onClick={showModal}>{project.project_treatments.length}</a></Tooltip>}
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
      setTreatments(res.data)
    }
}
  useEffect(()=>{
    setProjectDetails()
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
              onOk={handleOk}
              loading={true}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              {treatments && <Table pagination={false} columns={modalTableColumns} dataSource={treatments && treatments}/>}
              
            </Modal>
            </>
}
export default ProjectDetails