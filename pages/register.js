import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import Link from "next/link";
import { useRouter } from "next/router";
import { signup } from "../src/store/actions/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Register.module.css";
import { StyledButton } from "../src/components/styleds";

const Register = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {

      const { payload } = await dispatch(signup(values));
      router.push("/");

      console.log("register result: ", payload);
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
            prefix={<LockOutlined className="site-form-item-icon" />}
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
            prefix={<LockOutlined className="site-form-item-icon" />}
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
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <StyledButton type="submit" style={{ marginBottom: 10 }}>
            Register
          </StyledButton>
          <Link href="/" className={styles.linkToLogin}>
            <a className={styles.forgetPass}>Login</a>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
