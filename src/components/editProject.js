import react, {useEffect, useState} from "react";
import {Button, Row, Col, Form, Select, DatePicker, Input, message} from "antd"
import {request} from "../requests"
import { LeftCircleOutlined } from '@ant-design/icons';
import {PageTitle} from "./styleds"

function EditProject ({project, setShowDetails}){
    console.log(project)
    const [status, setStatus] = useState()
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);

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
        setStatus(e)
      }
    //   useEffect(()=>{
          
    //   })
    return <div style={{margin: "10px"}}>
        <PageTitle> <LeftCircleOutlined className={"backButton"} onClick={() => setShowDetails(false)}  /> Create Project</PageTitle>
        <div style={{marginTop: "10px"}}>
                <Form
                    form={form}
                    labelCol={{ span: 24 }}
                    wrapperCol={wrapperCol}
                    name="formData"
                    onFinish={onFinish}>
                    <Row gutter={24}>
                    <Col span={6} key={2}>
                        <Form.Item
                            name={`PROJECT_STATUS`}
                            label={`Project Status`}
                            rules={[ {
                                required: true,
                                message: 'This field is required',
                            },]} >
                            <Select  size={"large"} onSelect={selectStatus}
                            >
                                <Select.Option value="Initiation">Initiation</Select.Option>
                                <Select.Option value="Authorized">Authorized</Select.Option>
                                <Select.Option value="Completed">Completed</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    {status && (status == "Completed" || status == "Authorized") && 
                        <>
                        <Col span={6} key={12}>
                        <Form.Item
                            name={`PROGRAM_NAME`}
                            label={`Program Name`} >
                                <Input size={"large"} id="warning2" />
                        </Form.Item>
                        </Col>
                        <Col span={6} key={14}>
                            <Form.Item
                                name={`PROGRAM_NUMBER`}
                                label={`Program Number`} >
                                    <Input size={"large"} id="warning2" />
                            </Form.Item>
                        </Col>
                        </>
                    }
                    {status && status === "Authorized" && 
                        <Col span={6} key={2}>
                        <Form.Item
                            name={`PROJECT_SUBPHASE`}
                            label={`Project Sub Phase`}
                            rules={status && status === "Completed" && [ {
                                required: true,
                                message: 'This field is required',
                            },]} >
                            <Select  size={"large"} onSelect={selectStatus}
                            >
                                <Select.Option value="ROW">ROW</Select.Option>
                                <Select.Option value="Design">Design</Select.Option>
                                <Select.Option value="Planning">Planning</Select.Option>
                                <Select.Option value="Construction">Construction</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    }
                  {status && status === "Authorized" && 
                    <>
                    <Col span={6} key={10}>
                        <Form.Item
                            name={`PROJECT_START_DATE`}  label={`Project Start Date`} >
                            <DatePicker size={"large"} style={{width: "100%"}} />
                        </Form.Item>
                    </Col>
                    <Col span={6} key={11}>
                        <Form.Item name={`PROJECT_END_DATE`} label={`Project End Date`}>
                            <DatePicker size={"large"} style={{width: "100%"}} />
                        </Form.Item>
                    </Col>
                    </>}
                    </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </Col>
                </Row>
                </Form>
        </div>
    </div>
}
export default EditProject;