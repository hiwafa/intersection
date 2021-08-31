import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from "../../styles/Login.module.css";
import { signin } from '../store/actions/UserSlice';
import { useDispatch } from 'react-redux';
import Link from "next/link";

import { StyledButton } from './styleds';

const Login = () => {

    const dispatch = useDispatch();

    const onFinish = async (values) => {
        try {

            const { payload } = await dispatch(signin(values));

            console.log("login result: ", payload);

        } catch (err) {
            console.log('ERR:Login:onFinish ', err);
        }
    };

    return (
        <>
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >

            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
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

                <Link target="_blank" href="/reset">
                    <a className={styles.forgetPass}>Forgot password?</a>
                </Link>
                
                <Link href="/register">
                    <a> &nbsp;&nbsp; register now</a>
                </Link>

            </Form.Item>

            <Form.Item>
                <StyledButton type="submit">
                    Log in
                </StyledButton>
            </Form.Item>
        </Form>
        </>
    );
};

export default Login;