import {Route, Routes} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedComp from './components/ProtectedComp';
import { ConfigProvider } from "antd";

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
        <Route path='/' element={<ProtectedComp>  <Home/> </ProtectedComp>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </ConfigProvider>
  )
}

export default App
