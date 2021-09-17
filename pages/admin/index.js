import React, {useState} from "react";
import Users from "../../src/components/Users";
import { StyledButton } from "../../src/components/styleds";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import Register from "../../src/components/Register";


const Admin = () => {

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontWeight: 'bold', marginLeft: 20, marginTop: 15 }}>Users</p>
        <StyledButton style={{ width: 120, marginRight: 20 }} onClick={showModal}>
          <PlusCircleOutlined />
          &nbsp; Create User
        </StyledButton>
      </div>

      <Users />

      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
       <Register />
      </Modal>

    </div>
  );

}

export default Admin;