import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { signin } from '../store/actions/UserSlice';
import { useDispatch } from 'react-redux';
import Link from "next/link";

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
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Link target="_blank" href="/reset" className="login-form-forgot">
                    <a>Forgot password</a>
                </Link>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                &nbsp;&nbsp; Or &nbsp;
                <Link href="">
                    <a>register now!</a>
                </Link>
            </Form.Item>
        </Form>
    );
};

export default Login;