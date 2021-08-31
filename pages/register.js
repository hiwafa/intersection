import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { getUser, resetPass } from '../src/store/actions/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

const Reset =  () => {

    const dispatch = useDispatch();
    const user = useSelector(getUser);

    const onFinish = async (values) => {
        try {

            console.log("user.jwt: ", user.jwt);
            console.log("values result: ", values);

            const { payload } = await dispatch(resetPass({...values, code: user.jwt}));

            console.log("login result: ", payload);

        } catch (err) {
            console.log('ERR:Login:onFinish ', err);
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
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your New Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="New Password"
                    />
                </Form.Item>

                <Form.Item
                    name="confirmPass"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password again!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Confirm Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Register plaas
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Reset;