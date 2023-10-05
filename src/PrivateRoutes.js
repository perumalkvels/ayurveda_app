import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = ({isAuth}) => {
//   let auth = {'token':true}
return (
    isAuth ? <Outlet/> : <Navigate to='/auth' replace/>
  )
}
export default PrivateRoutes;