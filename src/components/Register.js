import { Form, Input, Spin, Switch, Select } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { createUser, updateUser } from "../store/actions/UserSlice";
import { useDispatch } from "react-redux";
import { StyledButton } from "./styleds";
import React, { useState, useRef, useEffect } from "react";
import { css } from '@emotion/css';
const { Option } = Select;

const spinStyle = css({
  '.ant-spin-dot-item': { backgroundColor: `#fff;` }
});

function generateUID() {
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}

const Register = ({ setVisible, record }) => {

  const formRef = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    formRef.current?.resetFields();
    if (record && record.username) {
      const newRecord = {
        ...record,
        blocked: record.blocked == "true" ? true : false,
        confirmed: record.confirmed == "true" ? true : false,
        role: record.role === "Super Admin" ? "1" :
          record.role === "Super User" ? "3" : "4"
      };
      formRef.current?.setFieldsValue(newRecord);
    }
  }, [record]);

  const onFinish = async (values) => {
    try {

      if (loading === true) return;

      setLoading(true);
      // const { payload } =

      await dispatch(record && record.username ?
        updateUser({ ...record, ...values }) : createUser(values));

      setLoading(false); setVisible(false);
      formRef.current?.resetFields();

    } catch (err) {
      console.log("ERR:register:onFinish ", err);
    }
  };

  return (
    <div>
      <Form
        ref={formRef}
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="Email Address"
          />
        </Form.Item>

        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Username"
          />
        </Form.Item>

        {
          !(record && record.username) &&
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            initialValue={!record ? generateUID() : ""}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
        }


        <Form.Item name="role" initialValue="1">
          <Select
            placeholder="Select a role"
            allowClear
          >
            <Option value="1">Super Admin</Option>
            <Option value="3">Super User</Option>
            <Option value="4">Project Anlyst</Option>
          </Select>
        </Form.Item>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Form.Item valuePropName="checked" label="Confirmed"
            initialValue={false} name="confirmed" style={{ marginRight: 20 }}>
            <Switch />
          </Form.Item>


          <Form.Item valuePropName="checked" label="Blocked" initialValue={false} name="blocked">
            <Switch />
          </Form.Item>
        </div>

        <Form.Item>
          <StyledButton type="submit" style={{ marginBottom: 10 }}>
            {
              loading ? <Spin size="small" className={spinStyle} /> :
                record && record.username ? "Update" : "Register"
            }
          </StyledButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
