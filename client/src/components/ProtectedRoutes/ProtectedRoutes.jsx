import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from '../../API/API';
import { setUser } from '../../redux/slices/userSlice';
import { hideLoading, showLoading } from '../../redux/slices/alertsSlice';

const ProtectedRoutes = (props) => {
    const {user} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate =useNavigate()

    const getUser = async() => {
        try {
            dispatch(showLoading())
            const res = await axios.post(`${API}/auth/get-user-info-by-id`, {token: localStorage.getItem("token")}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                dispatch(setUser(res.data.data))
            }
            else{
                localStorage.clear()
                navigate("/login")
            }
        } catch (error) {
            dispatch(hideLoading())
            localStorage.clear()
            navigate("/login")
        }
    }

    useEffect(() => {
        if(!user){
            getUser()
        }
    }, [user])
    if (localStorage.getItem("token")) {
        return props.children;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoutes;
