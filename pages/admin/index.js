import React, { useState } from "react";
import Users from "../../src/components/Users";
import { StyledButton } from "../../src/components/styleds";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import Register from "../../src/components/Register";


const Admin = () => {

  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState(null);

  const showModal = () => {
    setRecord(null);
    setVisible(true);
  };

  const onEdit = (rcrd) => {
    setRecord(rcrd);
    setVisible(true);
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

      <Users refresh={visible} onEditing={onEdit} />

      {
        visible && <Modal
          title={record && record.username ?
            "Edit User" : "Register New User"}
          visible={visible} footer={null}
          onCancel={() => setVisible(false)}
        >
          <Register setVisible={() => setVisible(false)} record={record} />
        </Modal>
      }

    </div>
  );

}

export default Admin;