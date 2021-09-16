import Users from "../../src/components/Users";

import { StyledButton } from "../../src/components/styleds";
import { PlusCircleOutlined } from "@ant-design/icons";

const Admin = () => {

  return (
    <div>

      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <p style={{ fontWeight: 'bold', marginLeft: 20, marginTop: 15 }}>Users</p>
        <StyledButton style={{ width: 120, marginRight: 20 }} onClick={() => { }}>
          <PlusCircleOutlined />
          &nbsp; Create User
        </StyledButton>
      </div>

      <Users />
    </div>
  );

}

export default Admin;