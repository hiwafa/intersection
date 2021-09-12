import styled from "styled-components";

export const StyledButton = styled.button`
background-color: #1393A9;
border: none;
border-radius: 5px;
height: 33px;
color: #fff;
cursor: pointer;
width: 100%;
  &:hover {
    background-color: #16A18C;
  }
`;
export const PageTitle = styled.div`
    font-size: 20px;
    margin-right: 10px;
    font-weight: 700;
    margin-bottom: 10px;
    .createProject{
        float: right;
        margin-right: 20px;
        font-size: 20px;
        margin-top: 10px;
        &:hover{
          color: #00A9B3;
        }
    };
    .backButton{
      margin-right: 10px;
      &:hover{
        color: #00A9B3;
      }
    }
`;
export const TableContainer = styled.div`
      .ant-table-content{
        overflow-y: hidden;
      };
      tbody{
        background: white;
      }
`