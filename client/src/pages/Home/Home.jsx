import React, { useEffect, useState } from 'react'
import axios from 'axios'
import API from '../../API/API'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast'
import { Col, Row } from 'antd'
import Doctor from '../../components/Doctor/Doctor'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/slices/alertsSlice'

const Home = () => {
  const [doctors, setDoctors] = useState([])
  const dispatch = useDispatch()
  
  const getData = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.get(`${API}/auth/get-all-approved-doctors`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      })
      dispatch(hideLoading())
      if (res.data.success) {
        setDoctors(res.data.data)
        toast.success(res.data.message)
      } else {
        toast.error('Failed to fetch data')
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error(error.message)
    }
  }
  
  useEffect(() => {
    getData()
  }, [])
  
  return (
    <Layout>
      <Row gutter={20}>
        {
          doctors.map((item, index) => (
            <Col key={index} span={8} xs={24} sm={24} lg={8}>
              <Doctor doctor={item} />
            </Col>
          ))
        }
      </Row>
    </Layout>
  )
}

export default Home
