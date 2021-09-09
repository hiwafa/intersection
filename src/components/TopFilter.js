import { Form, Select, DatePicker } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { StyledButton } from "./styleds";
const { Option } = Select;


const intersectionType = ['4-way', 'T', 'Y', 'Roundabout', 'Median U-Turn', 'Jughandle', 'Quadrant'];
const crashType = ['All', 'Fatal', 'Type A', 'Type B', 'Type C', 'PDO', 'Injury'];
const collisionType = ['Angle', 'Rear End', 'Sideswipe Same Direction'];
const TopFilter = ({ onFilter }) => {

    const onFinish = async (values) => {
        try {
            onFilter(values);
        } catch (err) {
            console.log("ERR:register:onFinish ", err);
        }
    };

    return (
        <Form
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
            <Form.Item style={{ margin: 10 }} tooltip="From" name="from">
                <DatePicker style={{width: 150}} />
            </Form.Item>

            <Form.Item style={{ margin: 10 }} tooltip="To" name="to">
                <DatePicker style={{width: 150}} />
            </Form.Item>

            <Form.Item style={{ margin: 10 }} tooltip="Crash Type" name="crash">
                <Select style={{width: 150}} placeholder="Select Crash Type">
                    {crashType.map((tipe, idx) => {
                        return <Option key={idx} value={tipe}>{tipe}</Option>;
                    })}
                </Select>
            </Form.Item>

            <Form.Item style={{ margin: 10 }} tooltip="Collision Type" name="collision">
                <Select style={{width: 150}} placeholder="Select Collision Type">
                    {collisionType.map((tipe, idx) => {
                        return <Option key={idx} value={tipe}>{tipe}</Option>;
                    })}
                </Select>
            </Form.Item>

            <div style={{ margin: 10, display: 'flex', flexDirection: 'row' }}>

                <Form.Item tooltip="Intersection Type" name="intersection">
                    <Select style={{width: 115}} placeholder="Select Intersection Type">
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
            </div>

            <div style={{width: 140}} />

        </Form>
    );
};

export default TopFilter;