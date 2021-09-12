import { Form, Select, DatePicker } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { StyledButton } from "./styleds";
import { useRef } from "react";
const { Option } = Select;


const intersectionType = ['4-way', 'T', 'Y', 'Roundabout', 'Median U-Turn', 'Jughandle', 'Quadrant'];
const collisionType = ['RearEnd', 'SingleVehicle', 'SideswipeSameDirection', 'HeadOn'];
const crashType = ['All', 'Fatal', 'PDO', 'INJ'];

const TopFilter = ({ onFilter }) => {

    const formRef = useRef();

    const onFinish = async (values) => {
        try {
            onFilter(values);
        } catch (err) {
            console.log("ERR:register:onFinish ", err);
        }
    };

    const onReset = () => {
        formRef.current?.resetFields();
    };

    return (
        <Form
            ref={formRef}
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
            layout='inline'

            style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <Form.Item style={{ margin: 10 }} tooltip="From" name="from" rules={[{ required: true }]}>
                <DatePicker style={{ width: 150 }} placeholder="From date" />
            </Form.Item>

            <Form.Item style={{ margin: 10 }} tooltip="To" name="to" rules={[{ required: true }]}>
                <DatePicker style={{ width: 150 }} placeholder="To date" />
            </Form.Item>

            <Form.Item style={{ margin: 10 }} tooltip="Crash Type" name="crash" rules={[{ required: true }]}>
                <Select style={{ width: 150 }} placeholder="Crash Type">
                    {crashType.map((tipe, idx) => {
                        return <Option key={idx} value={tipe}>{tipe}</Option>;
                    })}
                </Select>
            </Form.Item>

            <Form.Item style={{ margin: 10 }} tooltip="Collision Type" name="collision">
                <Select style={{ width: 150 }} placeholder="Collision Type">
                    {collisionType.map((tipe, idx) => {
                        return <Option key={idx} value={tipe}>{tipe}</Option>;
                    })}
                </Select>
            </Form.Item>

            <div style={{ margin: 10, display: 'flex', flexDirection: 'row' }}>

                <Form.Item tooltip="Intersection Type" name="intersection">
                    <Select style={{ width: 115 }} placeholder="Intersection Type">
                        {intersectionType.map((tipe, idx) => {
                            return <Option key={idx} value={tipe}>{tipe}</Option>;
                        })}
                    </Select>
                </Form.Item>

                <Form.Item style={{ width: 35 }}>
                    <StyledButton type="submit">
                        Go
                    </StyledButton>
                </Form.Item>

                <a style={{ alignSelf: 'center' }} onClick={onReset}>
                    reset
                </a>
            </div>

            <div style={{ width: 140 }} />

        </Form>
    );
};

export default TopFilter;
