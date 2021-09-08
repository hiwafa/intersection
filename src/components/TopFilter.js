import { Form, Select, DatePicker } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { StyledButton } from "./styleds";
const { Option } = Select;


const intersectionType = ['4-way', 'T', 'Y', 'Roundabout', 'Median U-Turn', 'Jughandle', 'Quadrant'];
const crashType = ['All', 'Fatal', 'Type A', 'Type B', 'Type C', 'PDO', 'Injury'];
const collisionType = ['Angle', 'Rear End', 'Sideswipe Same Direction'];
const TopFilter = ({ inventories }) => {

    const onFinish = async (values) => {
        try {
            alert(JSON.stringify(values));
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
            <Form.Item style={{ margin: 10 }} label="From" name="from">
                <DatePicker />
            </Form.Item>

            <Form.Item style={{ margin: 10 }} label="To" name="to">
                <DatePicker />
            </Form.Item>

            <Form.Item style={{ margin: 10 }} label="Crash Type" name="crash">
                <Select placeholder="Select Crash Type">
                    {crashType.map(tipe => {
                        return (
                            <Option value={tipe}>{tipe}</Option>
                        )
                    })}
                </Select>
            </Form.Item>

            <Form.Item style={{ margin: 10 }} label="Collision Type" name="collision">
                <Select placeholder="Select Collision Type">
                    {collisionType.map(tipe => {
                        return (
                            <Option value={tipe}>{tipe}</Option>
                        )
                    })}
                </Select>
            </Form.Item>

            <div style={{ margin: 10, display: 'flex', flex: 1, flexDirection: 'row' }}>

                <Form.Item label="Intersection Type" name="ntersection">
                    <Select placeholder="Select Intersection Type">
                        {intersectionType.map(tipe => {
                            return (
                                <Option value={tipe}>{tipe}</Option>
                            )
                        })}
                    </Select>
                </Form.Item>

                <Form.Item style={{ width: 80 }}>
                    <StyledButton type="submit">
                        Submit
                    </StyledButton>
                </Form.Item>
            </div>

        </Form>
    );
};

export default TopFilter;
