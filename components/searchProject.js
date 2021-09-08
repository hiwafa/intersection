import react, { useState, useEffect } from "react"
import {Button, Table, Space, Input, message} from "antd"
import {request} from "../src/requests"
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';


function SearchProject(){
    const [projects, setProjects] = useState([])
    const [searchText, setSearchText] = useState("")
    const [searchedColumn, setSearchedColumn] = useState("")
    let searchInput;


    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
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
      ),
      filterIcon: filtered => <SearchOutlined style={{ fontSize: "20px", color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '',
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => searchInput.select(), 100);
        }
      },
      render: text =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
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
        title: () => <b>{'PROJECT NAME'}</b>,
        dataIndex: 'name',
        render: text => <a>{text}</a>,
        ...getColumnSearchProps('name')
      },
      {
        title: 'ROUTE',
        className: 'column-money',
        dataIndex: 'route',
        align: 'right',
      },
      {
        title: 'DIRECTION',
        dataIndex: 'direction',
      },
      {
          title: 'START MP',
          dataIndex: 'startMp',
      },
      {
          title: 'END MP',
          dataIndex: 'endMp',
      },
      {
          title: 'NO OF CRASHES',
          dataIndex: 'numberOfCrashes',
      },
      {
          title: 'TOTAL TREATMENT',
          dataIndex: 'totalTreatment',
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
                      route: project.ROUTE,
                      direction: project.DIRECTION,
                      startMp: project.START_MP,
                      endMp: project.END_MP,
                      numberOfCrashes: project.CRASH_COUNT,
                      totalTreatment: "total treatment"
                  })
                  )
                )
              }
          }
        useEffect(()=>{
          loadProjects()
        }, [])
      return <>
          <h2>Search Project</h2>
          <div>
          <Table
              columns={columns}
              dataSource={projects && projects}
              bordered
              filterSearch={true}
              // title={() => 'Header'}
              footer={() => 'Footer'}
          />
          </div>
          </>
}

export default SearchProject;