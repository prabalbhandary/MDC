import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../../redux/slices/alertsSlice';
import axios from 'axios';
import API from '../../../API/API';
import Layout from '../../../components/Layout/Layout';
import { Table } from 'antd';
import toast from 'react-hot-toast';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getDoctorsData = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.get(`${API}/admin/get-all-doctors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(hideLoading());
      if (res.data.success) {
        setDoctors(res.data.data);
      } else {
        toast.error("Failed to fetch doctors data.");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("An error occurred while fetching doctors data.");
    }
  };

  const changeDoctorStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(`${API}/admin/change-doctor-account-status`, { doctorId: record._id, userId: record.userId, status: status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success(res.data.message);
        getDoctorsData();
      }
    } catch (error) {
      toast.error(error.message);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => <span>{record.firstName} {record.lastName}</span>
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber"
    },
    {
      title: "Created At",
      dataIndex: "createdAt"
    },
    {
      title: "Status",
      dataIndex: "status"
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {
            record.status === "pending" && <h1 className="anchor" onClick={() => changeDoctorStatus(record, "approved")}>Approve</h1>
          }
          {
            record.status === "approved" && <h1 className="anchor" onClick={() => changeDoctorStatus(record, "blocked")}>Block</h1>
          }
        </div>
      )
    }
  ];

  return (
    <Layout>
      <h1 className="page-header">Doctors List</h1>
      <hr />
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default DoctorList;
