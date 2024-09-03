import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import DoctorForm from "../../../components/DoctorForm/DoctorForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../../../redux/slices/alertsSlice";
import API from "../../../API/API";
import axios from "axios";
import toast from "react-hot-toast";
import moment from 'moment';

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());

      const response = await axios.post(
        `${API}/doctor/update-doctor-profile`,
        { 
          ...values, 
          userId: params.userId, 
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm")
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());

      const res = await axios.post(
        `${API}/doctor/get-doctor-info-by-user-id`,
        { userId: user?._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());

      if (res.data.success) {
        setDoctor(res.data.data);
      } else {
        toast.error(res.data.message || "Failed to fetch doctor data");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <Layout>
      <h1 className="page-title">Doctor Profile</h1>
      <hr />
      {doctor ? (
        <DoctorForm onFinish={onFinish} initialValues={doctor} />
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
};

export default DoctorProfile;
