import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../../redux/slices/alertsSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import API from '../../API/API';
import { setUser } from '../../redux/slices/userSlice';

const Notifications = () => {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const markAllAsSeen = async() => {
        try {
            dispatch(showLoading())
              const response = await axios.post(`${API}/auth/mark-all-notifications-as-seen`, {userId: user._id}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
              })
              dispatch(hideLoading())
              if(response.data.success){
                  toast.success(response.data.message)
                  dispatch(setUser(response.data.data))
              }else{
                  toast.error(response.data.message)
              }
          } catch (error) {
            dispatch(hideLoading())
              toast.error(error.message)
          }
    }
    const deleteAll = async() => {
        try {
            dispatch(showLoading())
              const response = await axios.post(`${API}/auth/delete-all-notifications`, {userId: user._id}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
              })
              dispatch(hideLoading())
              if(response.data.success){
                  toast.success(response.data.message)
                  dispatch(setUser(response.data.data))
              }else{
                  toast.error(response.data.message)
              }
          } catch (error) {
            dispatch(hideLoading())
              toast.error(error.message)
          }
    }
    if (!user) {
        return (
            <Layout>
                <h1 className="page-title">Notifications</h1>
                <hr />
                <p>Loading...</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <h1 className="page-title">Notifications</h1>
            <hr />
            <Tabs>
                <Tabs.TabPane tab="Unseen" key="0">
                    <div className="d-flex justify-content-end">
                        <h1 className="anchor" onClick={() => markAllAsSeen()}>Mark all as seen</h1>
                    </div>
                    {user?.unseenNotifications && user.unseenNotifications.map((item, index) => (
                        <div className='card p-2' key={index} onClick={() => navigate(item.onClickPath)}>
                            <div className="card-text">{item.message}</div>
                        </div>
                    ))}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Seen" key="1">
                <div className="d-flex justify-content-end">
                        <h1 className="anchor" onClick={() => deleteAll()}>Delete all</h1>
                    </div>
                    {user?.seenNotifications && user.seenNotifications.map((item, index) => (
                        <div className='card p-2' key={index} onClick={() => navigate(item.onClickPath)}>
                            <div className="card-text">{item.message}</div>
                        </div>
                    ))}
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    );
}

export default Notifications;
