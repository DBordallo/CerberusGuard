import React from 'react'
import { useAuth } from '../../authcontext/AuthContext'

function Logout() {
    const {logout} =useAuth()

  return (
    <button onClick={logout}>
        Logout
    </button>
  )
}

export default Logout