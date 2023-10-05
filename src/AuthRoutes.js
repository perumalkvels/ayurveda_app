import { Navigate, Outlet } from 'react-router-dom'

const AuthRoutes = ({isAuth}) => {
console.log('isAuth_AuthRoutes',isAuth);
return (
    !isAuth ? <Outlet/> : <Navigate to='/' replace/>
  )
}
export default AuthRoutes;