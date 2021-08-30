import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined,MailOutlined } from '@ant-design/icons';

import { signup } from '../store/actions/UserSlice';
import { useDispatch } from 'react-redux';
import Link from "next/link";

const SignUp = () => {

    const dispatch = useDispatch();

    const onFinish = async (values) => {
        console.log("I am here with the value:",values);
        try {
            const { payload } = await dispatch(signup(values));

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
        <h1 style={{paddingBottom:20,textAlign:'center'}}>SignUp</h1>
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
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                        type:'email',
                        message:'Please input correct email'
                    },
                ]}
            >
                <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    type="email"
                    placeholder="Email"
                />
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
                <Button type="primary" htmlType="submit" className="login-form-button">
                   SignUp
                </Button>
                &nbsp;&nbsp; Or &nbsp;
                <Link href="">
                    <a>Login Now!!</a>
                </Link>
            </Form.Item>
        </Form>
    );
};

export default SignUp;