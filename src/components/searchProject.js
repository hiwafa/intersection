import react, { useState, useEffect } from "react"
import {Button, Table, Space, Input} from "antd"
import {request} from "../requests"
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import styled from "styled-components";
import {TableContainer} from "./styleds"
const ActionContainer = styled.div`
  text-align: center;
  .viewDetails{
    font-size: 18px;
    margin-left: 5px;
    margin-right: 5px;
    color: #1890ff;
  };
  .editProject{
    font-size: 18px;
    margin-left: 5px;
    margin-right: 5px;
    color: #1890ff;
  }
`;
function SearchProject({setShowDetails, setProject, setSection, setInterSection}){
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
        title: <b>{'STATUS'}</b>,
        dataIndex: 'status',
        responsive: ['xs', 's', 'md', 'lg']
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
        title: <b>{'NO. OF CRASHES'}</b>,
        dataIndex: 'NumberOfCrashes',
      },
      {
        title: <b>{'TOTAL TREATMENTS'}</b>,
        dataIndex: 'totalTreatments',
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
            setProjects(
              res.data.map((project, index) => ({
                      key: index,
                      name: project.PROJECT_NAME,
                      status: project.PROJECT_STATUS,
                      intersection: project.INTERSECTION?.INTERSECTION_NAME,
                      programName: project.PROGRAM_NAME,
                      programNumber: project.PROGRAM_NUMBER,
                      NumberOfCrashes: project.CRUSH_COUNT,
                      totalTreatments: project.project_treatments,
                      action: <ActionContainer><EditOutlined onClick={() => selectProject(project, "edit")} className={"editProject"} /> <EyeOutlined className={"viewDetails"} onClick={() => selectProject(project, "view")} /></ActionContainer>
                  })
                  )
                )
              }
          }
          const loadIntersections = async (project) => {
            const res = await request(`/intersection-inventories/${project.INTERSECTION?.id}`, {
                method: "GET",
              });
              if(res.status === 200)
              {
                return res.data
              }
        }
        useEffect(()=>{
          loadProjects()
        }, [])
        const selectProject = async (project, section) => {
          let inter = await loadIntersections(project)
          if(inter)
          {
            setInterSection(inter)
            setProject(project)
            setSection(section)
            setShowDetails(true)
          }

        }
      return <>
          <TableContainer className={"projects"}>
          <Table
              columns={columns}
              dataSource={projects && projects}
              bordered
              filterSearch={true}
       
            />
          </TableContainer>
          </>
}

export default SearchProject;