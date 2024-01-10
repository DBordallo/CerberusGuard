import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../authcontext/AuthContext'

function Root() {
  return (
    <>
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    </>
  )
}

export default Root