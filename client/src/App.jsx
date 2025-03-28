import {Route, Routes} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedComp from './components/ProtectedComp';
import { ConfigProvider } from "antd";
import CustomerProfile from './components/Customer/CustomerProfile';
import AdminProfile from './components/Admin/AdminProfile';
import PartnerProfile from './components/Partner/PartnerProfile';

function App() {
  return (
    <ConfigProvider
      theme={{
        token:{
          colorPrimary: "#f84464",
          colorPrimaryHover: "#ff496b",
          //colorBgContainer: "#f5f5f5",
        },
      }}
    >
      <Routes>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/' element={<ProtectedComp>  <Home/> </ProtectedComp>}></Route>
        <Route path='/customer-profile' element={<ProtectedComp>  <CustomerProfile/> </ProtectedComp>}></Route>
        <Route path='/admin-profile' element={<ProtectedComp>  <AdminProfile/> </ProtectedComp>}></Route>
        <Route path='/partner-profile' element={<ProtectedComp>  <PartnerProfile/> </ProtectedComp>}></Route>
      </Routes>
    </ConfigProvider>
  )
}

export default App
