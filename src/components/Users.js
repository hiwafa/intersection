import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useGetIntersectionsQuery } from '../store/query';

const Users = ({refresh}) => {

    const searchInput = useRef();
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const users = useGetIntersectionsQuery("users?_sort=created_at:desc");

    const data = useMemo(() => {

        if (users.data && users.data.length) {
            console.log(users.data)
            return users.data.map(user => ({
                ...user, role: user.role.name, confirmed: `${user.confirmed}`
            }))
        }

        return [];
    }, [users.data]);


    useEffect(()=> {
        users.refetch();
    }, [refresh]);


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
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
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current.select(), 100);
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

    const columns = [
        {
            title: <p style={{fontWeight: 'bold', fontSize: 15 }}>Id</p>,
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            ...getColumnSearchProps('id'),
        },
        {
            title: <p style={{fontWeight: 'bold', fontSize: 15 }}>User Name</p>,
            dataIndex: 'username',
            key: 'username',
            width: '20%',
            ...getColumnSearchProps('username'),
        },
        {
            title: <p style={{fontWeight: 'bold', fontSize: 15 }}>Email</p>,
            dataIndex: 'email',
            key: 'email',
            width: '30%',
            ...getColumnSearchProps('email'),
        },
        {
            title: <p style={{fontWeight: 'bold', fontSize: 15 }}>Confirmed</p>,
            dataIndex: 'confirmed',
            key: 'confirmed',
            width: '10%',
            ...getColumnSearchProps('confirmed'),
        },
        {
            title: <p style={{fontWeight: 'bold', fontSize: 15 }}>Role</p>,
            dataIndex: 'role',
            key: 'role',
            ...getColumnSearchProps('role'),
            sorter: (a, b) => a.role.length - b.role.length,
            sortDirections: ['descend', 'ascend'],
        },
    ];


    return <Table rowKey="id" columns={columns} dataSource={data}
        style={{ marginLeft: 15, marginRight: 15 }} />;
}


export default Users;