import React, { useState } from 'react'
import Layout from '../../../components/Layout/Layout'

const AdminProfile = () => {
  const [user, setUser] = useState(null)
  return (
    <Layout>
      <h1 className="page-title">Admin Profile</h1>
      <hr />
      {user?.isAdmin ? (
        <div></div>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  )
}

export default AdminProfile