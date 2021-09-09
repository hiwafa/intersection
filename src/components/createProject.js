import react from "react";
import {Button, Row, Col, Form, Select, DatePicker, Input, message} from "antd"
import {request} from "../requests"
import { LeftCircleOutlined } from '@ant-design/icons';
import {PageTitle} from "./styleds"

function CreateProject ({handleClick}){
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        await request("projects", {
            method: "POST",
            data: values,
          }).then((res) => {
              if(res.status === 200)
              {
                message.success("Project created")
              }
          }).catch((e) => {
              message.error("Project not created")
          });
      };
      const   wrapperCol = {
        xs: { span: 24 },
        sm: { span: 24 },
      }
    return <>
        <PageTitle> <LeftCircleOutlined className={"backButton"} onClick={() => handleClick(true)} /> Create Project</PageTitle>
        <div>
        <Form
                    form={form}
                    labelCol={{ span: 24 }}
                    wrapperCol={wrapperCol}
                    name="formData"
                    onFinish={onFinish}>
                    <Row gutter={24}>
                    <Col span={6} key={1}>
                        <Form.Item
                            name={`PROJECT_NAME`}
                            label={`Project Name`} 
                            rules={[
                                {
                                    required: true,
                                    message: 'This field is required',
                                },
                                ]}>
                                <Input size={"large"} id="warning2" />
                        </Form.Item>
                    </Col>
                    <Col span={6} key={2}>
                        <Form.Item
                            name={`INTERSECTION`}
                            label={`Intersection`}
                            rules={[ {
                                required: true,
                                message: 'This field is required',
                            },]} >
                            <Select  size={"large"} showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                            >
                                <Select.Option value="1">type 1</Select.Option>
                                <Select.Option value="2">type 2</Select.Option>
                                <Select.Option value="3">type 3</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6} key={7}>
                        <Form.Item
                            name={`CRASH_START_DATE`}
                            label={`Crash Start Date`}
                            rules={[
                            {
                                required: true,
                                message: 'This field is required',
                            },
                            ]}
                        >
                            <DatePicker size={"large"} style={{width: "100%"}} />
                        </Form.Item>
                    </Col>
                    <Col span={6} key={8}>
                        <Form.Item
                            name={`CRASH_END_DATE`}
                            label={`Crash End Date`}
                            rules={[
                            {
                                required: true,
                                message: 'This field is required',
                            },
                            ]}
                        >
                            <DatePicker size={"large"} style={{width: "100%"}} />
                        </Form.Item>
                    </Col>
                    <Col span={6} key={10}>
                        <Form.Item
                            name={`PROJECT_START_DATE`}
                            label={`Project Start Date`}
                        >
                            <DatePicker size={"large"} style={{width: "100%"}} />
                        </Form.Item>
                    </Col>
                    <Col span={6} key={11}>
                        <Form.Item
                            name={`PROJECT_END_DATE`}
                            label={`Project End Date`}
                        >
                            <DatePicker size={"large"} style={{width: "100%"}} />
                        </Form.Item>
                    </Col>
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
    </>
}
export default CreateProject;