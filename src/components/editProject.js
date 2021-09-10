import react, {useState} from "react";
import {Button, Row, Col, message, notification} from "antd"
import { Formik } from "formik"
import {
    Input,
    DatePicker,
    SubmitButton,
    Select,
    Form,
  } from "formik-antd"
import {request} from "../requests"
import { LeftCircleOutlined } from '@ant-design/icons';
import {PageTitle} from "./styleds"
function EditProject ({project, setShowDetails}){
 
    const [status, setStatus] = useState(project.PROJECT_STATUS)
      const selectStatus = (e) => {
        setStatus(e)
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
              <Col span={8} key={2}>
              <Form.Item
                name="PROJECT_NAME"
                label={`Project Name`}
                hasFeedback={true}>
                <Input size={"large"} name="PROJECT_NAME"  />
              </Form.Item>
              </Col>
              {status && (status === "Completed" || status === "Authorized") && <>
            <Col span={8} key={2}>
              <Form.Item
                name="PROGRAM_NAME"
                label={`Program Name`}
                hasFeedback={true}>
                <Input size={"large"} name="PROGRAM_NAME"  />
              </Form.Item>
              </Col>
            <Col span={8} key={3}>
              <Form.Item
                name="PROGRAM_NUMBER"
                label={`Program Number`}
                hasFeedback={true}>
                <Input size={"large"} name="PROGRAM_NUMBER"  />
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