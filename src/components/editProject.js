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
import {PageTitle, ContentContainer, ThemButton} from "./styleds"
function EditProject ({project, setShowDetails}){
 
    const [status, setStatus] = useState(project.PROJECT_STATUS)
      const selectStatus = (e) => {
        setStatus(e)
      }
      async function handleSubmit(values, actions) {

        if(values.PROJECT_STATUS === "Initiation")
        {
          if (values.PROGRAM_NAME !== project.PROGRAM_NAME || values.PROGRAM_NUMBER !== project.PROGRAM_NUMBER ||
             values.PROJECT_START_DATE !== project.PROJECT_START_DATE || values.PROJECT_END_DATE !== project.PROJECT_END_DATE ||
             values.PROJECT_SUBPHASE !== project.PROJECT_SUBPHASE)
             {
              notification["error"]({
                duration: 5,
                message: "You can not change these values when the status is Initiation",
              })
              return
             }
        }
        else if(values.PROJECT_STATUS === "Authorized")
        {
          console.log(values.PROJECT_START_DATE)
          if(!values.PROJECT_SUBPHASE)
          {
            notification["error"]({
              duration: 5,
              message: "Please select project Sub-Phase",
            })
            return
          }
          if(values.PROJECT_START_DATE === null || project.PROJECT_END_DATE === null)
          {
            notification["error"]({
              duration: 5,
              message: "Project start date and end date can not be null",
            })
            return
          }
        }
        else if(values.PROJECT_STATUS === "Completed")
        {
          if(!values.PROJECT_SUBPHASE)
          {
            notification["error"]({
              duration: 5,
              message: "Please select project Sub-Phase",
            })
            return
          }
        }
          await request(`projects/${values.id}`, {
            method: "PUT",
            data: values,
          }).then((res) => {
            notification["success"]({
                duration: 5,
                message: "Project Edited",
              })
              setShowDetails(false)
          }).catch((e) => {
              console.log(e)
          });

        actions.setSubmitting(false)
      }
      
    return <div style={{margin: "10px"}}>
        <PageTitle > <LeftCircleOutlined className={"backButton"} onClick={() => setShowDetails(false)}  /> Edit Project</PageTitle>
        <ContentContainer style={{marginTop: "10px"}}>
        <Formik
      initialValues={project}
      onSubmit={handleSubmit}
      render={formik => (
        <Form
        labelCol={{ span: 24 }}
        wrapperCol={{span: 24}}>
          <div className="container">
            <Row gutter={24} className="component-container">
            <Col xs={24} sm={12} md={6} lg={6} key={1}>
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
              <Col xs={24} sm={12} md={6} lg={6} key={2}>
              <Form.Item
                name="PROJECT_NAME"
                label={`Project Name`}
                hasFeedback={true}>
                <Input size={"large"} name="PROJECT_NAME"  />
              </Form.Item>
              </Col> 
            <Col xs={24} sm={12} md={6} lg={6} key={2}>
              <Form.Item
                name="PROGRAM_NAME"
                label={`Program Name`}
                rules={[
                  {
                      cantChange: 'Can not change this field right now',
                  },
                  ]}
                hasFeedback={true}>
                <Input size={"large"} name="PROGRAM_NAME"  />
              </Form.Item>
              </Col>
            <Col xs={24} sm={12} md={6} lg={6} key={3}>
              <Form.Item
                name="PROGRAM_NUMBER"
                label={`Program Number`}
                hasFeedback={true}>
                <Input size={"large"} name="PROGRAM_NUMBER"  />
              </Form.Item>
              </Col>
            <Col xs={24} sm={12} md={6} lg={6} key={4}>
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

            <Col xs={24} sm={12} md={6} lg={6} key={5}>
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
            <Col xs={24} sm={12} md={6} lg={6} key={6}>
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
              </Col>
            <Col span={24} key={7}>
              <Button.Group size="medium">
                <ThemButton type="primary" htmlType={"submit"} disabled={false}>
                  Submit
                </ThemButton>
              </Button.Group>
              </Col>
            </Row>

            {/* <FormikDebug style={{ maxWidth: 400 }} /> */}
          </div>
        </Form>
      )}
    />
        </ContentContainer>
    </div>
}
export default EditProject;