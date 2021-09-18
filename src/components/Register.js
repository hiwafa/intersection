import { Form, Input, Spin, Switch, Select } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import styles from "../../styles/Register.module.css";
import { signup } from "../store/actions/UserSlice";
import { useDispatch } from "react-redux";
import { StyledButton } from "./styleds";
import React, { useState, useRef, useEffect } from "react";
import { css } from '@emotion/css';
const { Option } = Select;

const spinStyle = css({
  '.ant-spin-dot-item': { backgroundColor: `#fff;` }
});

const Register = ({ setVisible, record }) => {

  const formRef = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    const newRecord = {
      ...record,
      blocked: record.blocked == "false" || record.blocked == null  ? false : true,
      confirmed: record.confirmed == "true" ? true : false,
    };
    formRef.current?.setFieldsValue(newRecord);
  }, [record]);

  const onFinish = async (values) => {
    try {

      if (loading === true) return;

      setLoading(true);
      // const { payload } =
      await dispatch(signup(values));
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
        initialValues={{
          remember: true,
        }}
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

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item name="role" initialValue="1">
          <Select
            placeholder="Select a role"
            allowClear
          >
            <Option value="1">Authenticated</Option>
            <Option value="3">Project Analyst</Option>
            <Option value="4">Admin</Option>
          </Select>
        </Form.Item>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Form.Item label="Confirmed" initialValue={false} name="confirmed" style={{ marginRight: 20 }}>
            <Switch />
          </Form.Item>

          <Form.Item label="Blocked" initialValue={false} name="blocked">
            <Switch />
          </Form.Item>
        </div>

        <Form.Item>
          <StyledButton type="submit" style={{ marginBottom: 10 }}>
            {loading ? <Spin size="small" className={spinStyle} /> : "Register"}
          </StyledButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
