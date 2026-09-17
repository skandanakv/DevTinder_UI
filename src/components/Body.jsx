import { Outlet } from 'react-router-dom'
//outlets renders the child routes
import NavBar from './NavBar'
import Footer from './Footer'

const Body = () => {
  return (
    <div>
   <NavBar /> 
    <Outlet />
    < Footer />
    </div>
   
  )
}

export default Body