import react, { useState, useEffect } from "react"
import {Button, Table, Space, Input, message} from "antd"
import {request} from "../requests"
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import Link from "next/link";
import styled from "styled-components"
const {Column} = Table
const ActionContainer = styled.div`
  text-align: center;
  .viewDetails{
    font-size: 18px;
    margin-left: 5px;
    margin-right: 5px;
    color: blue;
  };
  .editProject{
    font-size: 18px;
    margin-left: 5px;
    margin-right: 5px;
    color: red;
  }
`
function SearchProject({setShowDetails, setProjectId}){
    const [projects, setProjects] = useState([])
    const [searchText, setSearchText] = useState("")
    const [searchedColumn, setSearchedColumn] = useState("")
    let searchInput;


    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: function selectKeys({ setSelectedKeys, selectedKeys, confirm, clearFilters }) {
        return <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText(selectedKeys[0])
                setSearchedColumn(dataIndex)
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      },
      filterIcon: function setFilter(filtered){return <SearchOutlined style={{ fontSize: "20px", color: filtered ? '#1890ff' : undefined }} />},
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '',
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => searchInput.select(), 100);
        }
      },
      render: function setHighlight(text, index) {
       return searchedColumn === dataIndex ? (
          <Highlighter key={index}
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        )
      }
    });
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0])
      setSearchedColumn(dataIndex)
    };
  
    const handleReset = clearFilters => {
      clearFilters();
      setSearchText("")
    };
    

    const columns = [
      {
        title: <b>{'PROJECT NAME'}</b>,
        dataIndex: 'name',
        // render: function name(text) {return text},
        ...getColumnSearchProps('name')
      },
      {
        title: <b>{'INTERSECTION'}</b>,
        dataIndex: 'intersection',
      },
      {
        title:  <b>{'PROGRAM NAME'}</b>,
        dataIndex: 'programName',
      },
      {
        title: <b>{'PROGRAM NUMBER'}</b>,
        dataIndex: 'programNumber',
      },
      {
        title: <b>{'CRASH_START_DATE'}</b>,
        dataIndex: 'crashStartDate',
      },
      {
        title: <b>{'CRASH_END_DATE'}</b>,
        dataIndex: 'crashEndDate',
      },
      {
        title: <b>{'ACTION'}</b>,
        dataIndex: 'action',
        // render:  (text) => {text},
      },
    ];
    

    const loadProjects = async () => {
        const res = await request("projects", {
            method: "GET",
          });
          if(res.status === 200)
          {
            console.log(res.data)
            setProjects(
              res.data.map((project, index) => ({
                      key: index,
                      name: project.PROJECT_NAME,
                      intersection: project.INTERSECTION,
                      programName: project.PROGRAM_NAME,
                      programNumber: project.PROGRAM_NUMBER,
                      crashStartDate: project.CRASH_START_DATE,
                      crashEndDate: project.CRASH_END_DATE,
                      action: <ActionContainer><EditOutlined className={"editProject"} /> <EyeOutlined className={"viewDetails"} onClick={() => handleRowClick(project.id)} /></ActionContainer>
                  })
                  )
                )
              }
          }
        useEffect(()=>{
          loadProjects()
        }, [])
        const handleRowClick = (projectId) => {
          setProjectId(projectId)
          setShowDetails(true)
        }
      return <>
          <div>
          <Table
              columns={columns}
              dataSource={projects && projects}
              bordered
              filterSearch={true}
       
            />
          </div>
          </>
}

export default SearchProject;