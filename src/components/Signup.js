import { Form, Input, Button, Select } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
const { Option } = Select;


import { signup } from '../store/actions/UserSlice';
import { useDispatch } from 'react-redux';
import Link from "next/link";

const SignUp = () => {

    const dispatch = useDispatch();

    const onChange = (value) => {
        console.log(`selected ${value}`);
    }

    const onBlur = () => {
        console.log('blur');
    }

    const onFocus = () => {
        console.log('focus');
    }

    const onSearch = (val) => {
        console.log('search:', val);
    }

    const onFinish = async (values) => {
        console.log("I am here with the value:", values);
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
            <h1 style={{ paddingBottom: 20, textAlign: 'center' }}>SignUp</h1>
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
                        type: 'email',
                        message: 'Please input correct email'
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

            <Form.Item
                name="role"
                rules={[
                    {
                        required: true,
                        message: 'Please input select a role!',
                    },
                ]}
            >

                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select role"
                    optionFilterProp="children"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="analyst">Project Analyst</Option>
                    <Option value="admin">Admin</Option>
                </Select>

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