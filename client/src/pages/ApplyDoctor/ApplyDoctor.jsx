import React from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../../redux/slices/alertsSlice";
import axios from "axios";
import API from "../../API/API";
import DoctorForm from "../../components/DoctorForm/DoctorForm";
import moment from 'moment';

const ApplyDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const onFinish = async (values) => {
    if (!user) {
      toast.error("User information is not available.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token not found.");
      return;
    }

    try {
      dispatch(showLoading());

      const response = await axios.post(
        `${API}/auth/apply-doctor-account`,
        { 
          ...values, 
          userId: user._id, 
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm")
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Layout>
      <h1 className="page-title">Apply Doctor</h1>
      <hr />
      <DoctorForm onFinish={onFinish} />
    </Layout>
  );
};

export default ApplyDoctor;
