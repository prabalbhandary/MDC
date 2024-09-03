import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'

const UserProfile = () => {
    const [user, setUser] = useState(null)
  return (
    <Layout>
      <h1 className="page-title">User Profile</h1>
      <hr />
      {user ? (
        <div></div>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  )
}

export default UserProfile