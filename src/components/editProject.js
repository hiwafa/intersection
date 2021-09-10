import react, {useEffect, useState} from "react";
import {Button, Row, Col, message, notification} from "antd"
import { Formik } from "formik"
import {
    Checkbox,
    Input,
    InputNumber,
    Switch,
    DatePicker,
    TimePicker,
    Radio,
    FormikDebug,
    FormItem,
    ResetButton,
    SubmitButton,
    Select,
    AutoComplete,
    Rate,
    Slider,
    Cascader,
    TreeSelect,
    Transfer,
    Form,
    Mentions,
  } from "formik-antd"
import {request} from "../requests"
import { LeftCircleOutlined } from '@ant-design/icons';
import {PageTitle} from "./styleds"
import moment from "moment"
import axios from "axios"
function EditProject ({project, setShowDetails}){
    const [pro, setProject] = useState(project)
    console.log("pro",pro)

    const [status, setStatus] = useState(project.PROJECT_STATUS)
    // const [form] = Form.useForm();
    const onFinish = async (values) => {
        let proj = {...project}
        if(values.PROJECT_STATUS === "Authorized")
        {
            proj.PROJECT_STATUS = values.PROJECT_STATUS;
            proj.PROGRAM_NAME = values.PROGRAM_NAME && values.PROGRAM_NAME;
            proj.PROGRAM_NUMBER = values.PROGRAM_NUMBER !== undefined ? values.PROGRAM_NUMBER : project.PROJECT_NUMBER;
            proj.PROJECT_SUBPHASE = values.PROJECT_SUBPHASE ? values.PROJECT_SUBPHASE : project.PROJECT_SUBPHASE;
            proj.PROJECT_START_DATE = values.PROJECT_START_DATE && values.PROJECT_START_DATE;
            proj.PROJECT_END_DATE = values.PROJECT_END_DATE && values.PROJECT_END_DATE;
        }
        console.log('new: ', proj && proj);
        console.log('old: ', project);

        return 3;
        await request("projects", {
            method: "PUT",
            data: values,
          }).then((res) => {
              if(res.status === 200)
              {
                message.success("Project Edited")
              }
          }).catch((e) => {
              message.error("Project not Updated")
          });
      };
      const   wrapperCol = {
        xs: { span: 24 },
        sm: { span: 24 },
      }
      const selectStatus = (e) => {
          console.log(e)
        setStatus(e)
      }
    //   useEffect(()=>{
          
    //   })
    function validateRequired(value) {
        return value ? undefined : "required"
      }
      async function handleSubmit(values, actions) {
          await request(`projects/${values.id}`, {
            method: "PUT",
            data: values,
          }).then((res) => {
            notification.open({
                duration: 0,
                message: "Project Edited",
              })
          }).catch((e) => {
              console.log(e)
          });

        actions.setSubmitting(false)
      }
      
    return <div style={{margin: "10px"}}>
        <PageTitle> <LeftCircleOutlined className={"backButton"} onClick={() => setShowDetails(false)}  /> Edit Project</PageTitle>
        <div style={{marginTop: "10px"}}>
        <Formik
      initialValues={project}
      onSubmit={handleSubmit}
      validate={values => {
          console.log(values)
          if(values.PROJECT_STATUS === "Completed" && values.PROJECT_SUBPHASE === null)
          message.error("Project sub phase can not be null")
        // if (!values.PROJECT_STATUS) {
        //   return { PROJECT_STATUS: "required" }
        // }
        return undefined
      }}
      render={formik => (
        <Form
        labelCol={{ span: 24 }}
        wrapperCol={{span: 24}}>
          <div className="container">
            <Row gutter={24} className="component-container">
            <Col span={8} key={1}>
            <Form.Item
                name="PROJECT_STATUS"
                label={`Project Status`}
                hasFeedback={true} >
                    <Select
                    name="PROJECT_STATUS"
                    style={{ width: "100%" }}
                    onSelect={selectStatus}
                    size={"large"}>
                    <Select.Option value="Initiation">Initiation</Select.Option>
                    <Select.Option value="Authorized">Authorized</Select.Option>
                    <Select.Option value="Completed">Completed</Select.Option>
                </Select>             
               </Form.Item>
              </Col>
              {status && (status === "Completed" || status === "Authorized") && <>
            <Col span={8} key={2}>
              <Form.Item
                name="PROGRAM_NAME"
                label={`Program Name`}
                hasFeedback={true}>
                <Input size={"large"} name="PROGRAM_NAME" placeholder="Validated input" />
              </Form.Item>
              </Col>
            <Col span={8} key={3}>
              <Form.Item
                name="PROGRAM_NUMBER"
                label={`Program Number`}
                hasFeedback={true}>
                <Input size={"large"} name="PROGRAM_NUMBER" placeholder="Validated input" />
              </Form.Item>
              </Col> </>}
              {status &&  status === "Authorized" && <>

            <Col span={8} key={4}>
              <Form.Item
                name="PROJECT_START_DATE"
                label={`Project Start Date`}
                hasFeedback={true}
              >
              <DatePicker
                name="PROJECT_START_DATE"
                style={{width: "100%"}}
                placeholder="DatePicker"
                size={"large"}
              />             
               </Form.Item>
              </Col>

            <Col span={8} key={5}>
               <Form.Item
                name="PROJECT_END_DATE"
                label={`Project End Date`}
                hasFeedback={true}
              >
              <DatePicker
                name="PROJECT_END_DATE"
                style={{width: "100%"}}
                placeholder="DatePicker"
                size={"large"}
              />             
               </Form.Item>
              </Col>
            <Col span={8} key={6}>
               <Form.Item
                name="PROJECT_SUBPHASE"
                label={`Project Sub Phase`}
                hasFeedback={true}
              >
                    <Select
                    name="PROJECT_SUBPHASE"
                    style={{ width: "100%" }}
                    size={"large"}
                >
                    <Select.Option value="ROW">ROW</Select.Option>
                    <Select.Option value="Design">Design</Select.Option>
                    <Select.Option value="Planning">Planning</Select.Option>
                    <Select.Option value="Construction">Construction</Select.Option>
                </Select>             
               </Form.Item>
              </Col> </>}
            <Col span={24} key={7}>
              <Button.Group size="large">
                <SubmitButton type="primary" disabled={false}>
                  Submit
                </SubmitButton>
              </Button.Group>
              </Col>
            </Row>

            {/* <FormikDebug style={{ maxWidth: 400 }} /> */}
          </div>
        </Form>
      )}
    />
        </div>
    </div>
}
export default EditProject;