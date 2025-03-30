import {Route, Routes} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedComp from './components/ProtectedComp';
import { ConfigProvider } from "antd";
import CustomerProfile from './components/Customer/CustomerProfile';
import AdminProfile from './components/Admin/AdminProfile';
import PartnerProfile from './components/Partner/PartnerProfile';
import AdminPage from './components/Admin/AdminPage';
import './styles/component-styles.css'

function App() {
  return (
    <ConfigProvider
      theme={{
        token:{
          colorPrimary: "#f84464",
          colorPrimaryHover: "#ff496b",
          //colorBgContainer: "#f5f5f5",
          //defaultBorderColor: "#f84464"
        },
      }}
    >
      <Routes>
        <Route path='/register/:role' element={<Register/>}></Route>
        <Route path='/login/:role' element={<Login/>}></Route>
        <Route path='/' element={<ProtectedComp defaultKey="1"> <Home/> </ProtectedComp>}></Route>
        <Route path='/customer-profile' element={<ProtectedComp defaultKey="3"> <CustomerProfile/> </ProtectedComp>}></Route>
        <Route path='/admin-profile' element={<ProtectedComp defaultKey="3"> <AdminProfile/> </ProtectedComp>}></Route>
        <Route path='/partner-profile' element={<ProtectedComp defaultKey="3"> <PartnerProfile/> </ProtectedComp>}></Route>
        <Route path='/admin-page' element={<ProtectedComp defaultKey="2"> <AdminPage/> </ProtectedComp>}></Route>
      </Routes>
    </ConfigProvider>
  )
}

export default App
