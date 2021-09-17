import { Form, Input, Spin, Space } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";

import Link from "next/link";
import { useRouter } from "next/router";
import { signup } from "../store/actions/UserSlice";
import { useDispatch } from "react-redux";
import { StyledButton } from "./styleds";
import React, { useState } from "react";

const Register = ({ setVisible }) => {

  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {

      if (loading === true) return;

      setLoading(true);
      // const { payload } =
      await dispatch(signup(values));
      setLoading(false); setVisible(false);

    } catch (err) {
      console.log("ERR:register:onFinish ", err);
    }
  };

  return (
    <div>
      <Form
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

        <Form.Item>
          <StyledButton type="submit" style={{ marginBottom: 10 }}>
            {
              loading ?
                <Space size="middle">
                  <Spin size="small" />
                </Space>
                : "Register"
            }
          </StyledButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
