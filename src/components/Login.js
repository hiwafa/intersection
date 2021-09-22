import { Form, Input, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from "../../styles/Login.module.css";
import { signin } from '../store/actions/UserSlice';
import { useDispatch } from 'react-redux';
import { StyledButton } from './styleds';
import { css } from '@emotion/css';
import { useState } from 'react';

const spinStyle = css({
    '.ant-spin-dot-item': { backgroundColor: `#fff;` }
});

const Login = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        try {

            if (loading === true) return;
            setLoading(true);
            await dispatch(signin(values));
            setLoading(false);

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
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                {/* <Form.Item>
                    <a className={styles.forgetPass}>Forgot password?</a>
                </Form.Item> */}

                <Form.Item>
                    <StyledButton type="submit">
                        {
                            loading ? <Spin size="small" className={spinStyle} /> : "Log In"
                        }
                    </StyledButton>
                </Form.Item>
            </Form>
        </>
    );
};

export default Login;