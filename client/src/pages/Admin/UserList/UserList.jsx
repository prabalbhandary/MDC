import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../../redux/slices/alertsSlice'
import axios from 'axios'
import API from '../../../API/API'
import Layout from '../../../components/Layout/Layout'
import { Table } from 'antd'

const UserList = () => {
  const [users, setUsers] = useState([])
  const dispatch = useDispatch()
  
  const getUserData = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.get(`${API}/admin/get-all-users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      dispatch(hideLoading())
      if (res.data.success) {
        setUsers(res.data.data)
      }
    } catch (error) {
      dispatch(hideLoading())
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  const columns = [
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Created At",
      dataIndex: "createdAt"
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div className="d-flex">
            <h1 className="anchor">Block</h1>
          </div>
        )
      }
    }
  ]

  return (
    <Layout>
      <h1 className="page-header">Users List</h1>
      <hr />
      <Table columns={columns} dataSource={users} />
    </Layout>
  )
}

export default UserList
