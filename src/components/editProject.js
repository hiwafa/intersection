import react, { useState } from "react";
import { Button, Row, Col, notification, Popconfirm } from "antd"
import { Formik } from "formik"
import {
  Input,
  DatePicker,
  Select,
  Form
} from "formik-antd"
import { formRequest } from "../requests"
import { LeftCircleOutlined } from '@ant-design/icons';
import { PageTitle, ContentContainer, ThemButton } from "./styleds"
import axios from "axios"
import styled from "styled-components";
import { useRouter } from "next/router";
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
const BASE_URL = process.env.BASE_URL;
const FileButtonsContainer = styled.div`
  .removeButton{
    margin-left: 20px;
    margin-bottom: 20px;
  }
`
const ProjectFileContainer = styled.div`
  padding-top: 5px;
  div{
    margin-top: 13px;
  }
`;

let pruject = {};
function EditProject({ setShowDetails }) {

  const { query, push } = useRouter();
  if (query && query.project) {
    pruject = JSON.parse(query.project);
  }

  const [status, setStatus] = useState(pruject.PROJECT_STATUS)
  const [removeLoading, setRemoveLoading] = useState(false)
  const [showUploadInput, setShowUploadInput] = useState(false)
  const text = 'Are you sure to delete the file?';

  useEffect(() => {

    return () => {
      pruject = {};
    };

  }, []);

  const confirmRemove = async (id) => {
    const remove = await formRequest(`upload/files/${id}`,
      { method: "DELETE" })
    if (remove.status === 200) {
      setRemoveLoading(false)
      setShowUploadInput(true)
    }
  }
  const selectStatus = (e) => {
    setStatus(e)
  }
  async function handleSubmit(values, actions) {
    let files = "";
    if (values.projectFile !== null) {
      files = new FormData();
      files.append("files", values.projectFile);
      files.append('ref', 'project')
      files.append('refId', values.id)
      files.append('field', 'projectFile')
    }
    if (values.PROJECT_STATUS === "Initiation") {
      if (values.PROGRAM_NAME !== pruject.PROGRAM_NAME || values.PROGRAM_NUMBER !== pruject.PROGRAM_NUMBER ||
        values.PROJECT_START_DATE !== pruject.PROJECT_START_DATE || values.PROJECT_END_DATE !== pruject.PROJECT_END_DATE ||
        values.PROJECT_SUBPHASE !== pruject.PROJECT_SUBPHASE) {
        notification["error"]({
          duration: 5,
          message: "You can not change these values when the status is Initiation",
        })
        return
      }
    }
    else if (values.PROJECT_STATUS === "Authorized") {
      if (!values.PROJECT_SUBPHASE) {
        notification["error"]({
          duration: 5,
          message: "Please select project Sub-Phase",
        })
        return
      }
      if (values.PROJECT_START_DATE === null || values.PROJECT_END_DATE === null) {
        notification["error"]({
          duration: 5,
          message: "Project start date and end date can not be null",
        })
        return
      }
    }
    else if (values.PROJECT_STATUS === "Completed") {
      if (!values.PROJECT_SUBPHASE) {
        notification["error"]({
          duration: 5,
          message: "Please select project Sub-Phase",
        })
        return
      }
    }

    try {
      const upload = await axios.post(`${BASE_URL}/upload`, files, {
        headers: {
          'Accept': 'application/json'
        },
      })
      if (upload.status === 200) {
        let filee = values.files[0];
        let newFile = upload.data.url;
        values.projectFile = upload.data
        setShowUploadInput(true)

      }
    }
    catch (e) {
      console.log("no file selected")
    }

    await formRequest(`projects/${values.id}`, {
      method: "PUT",
      data: values,
      headers: {
        'Accept': 'application/json'
      }
    }).then((res) => {
      notification["success"]({
        duration: 5,
        message: "Project Edited",
      })
      push("projects")
    }).catch((e) => {
      console.log(e)
    });

    actions.setSubmitting(true)
  }

  return <div style={{ margin: "10px" }}>
    <PageTitle > <LeftCircleOutlined className={"backButton"} onClick={() => push("projects")} /> Edit Project</PageTitle>
    <ContentContainer style={{ marginTop: "10px" }}>
      <Formik
        initialValues={pruject}
        onSubmit={handleSubmit}
        render={formik => (
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}>
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
                    <Input size={"large"} name="PROJECT_NAME" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={6} lg={6} key={20}>
                  <Form.Item
                    name="PROGRAM_NAME"
                    label={`Program Name`}
                    rules={[
                      {
                        cantChange: 'Can not change this field right now',
                      },
                    ]}
                    hasFeedback={true}>
                    <Input size={"large"} name="PROGRAM_NAME" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={6} lg={6} key={3}>
                  <Form.Item
                    name="PROGRAM_NUMBER"
                    label={`Program Number`}
                    hasFeedback={true}>
                    <Input size={"large"} name="PROGRAM_NUMBER" />
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
                      style={{ width: "100%" }}
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
                      style={{ width: "100%" }}
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
                <Col xs={24} sm={12} md={6} lg={6} key={7}>
                  {pruject.projectFile?.id && !showUploadInput ? <ProjectFileContainer>
                    <span>Project File</span>
                    <FileButtonsContainer>

                      <a href={`${BASE_URL}${pruject.projectFile?.url}`}><Button type={"primary"} icon={<DownloadOutlined />} htmlType={"button"} size={"large"} className={"downloadButton"}></Button></a>
                      <Popconfirm placement="top" title={text} onConfirm={() => confirmRemove(pruject.projectFile.id)} okText="Yes" cancelText="No">
                        <Button type={"danger"} loading={removeLoading} icon={<DeleteOutlined />} htmlType={"button"} size={"large"} className={"removeButton"}></Button>
                      </Popconfirm>
                    </FileButtonsContainer>
                  </ProjectFileContainer> : <Form.Item
                    name="files"
                    label={`Project File`}
                    hasFeedback={true}
                  >
                    <Input
                      type="file"
                      name="files"
                      value={undefined}
                      onChange={(event) => {
                        formik.setFieldValue("projectFile", event.target.files[0]);
                      }}
                    />
                  </Form.Item>


                  }

                </Col>

                <Col span={24} key={8}>
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