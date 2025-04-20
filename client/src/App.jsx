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
import PartnerPage from './components/Partner/PartnerPage';
import MoviePage from './components/MoviePage';
import './styles/component-styles.css';
import BookingPage from './components/BookingPage';

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
        <Route path='/' element={<ProtectedComp defaultSelectionKey="1"> <Home/> </ProtectedComp>}></Route>
        <Route path='/customer-profile' element={<ProtectedComp defaultSelectionKey="3"> <CustomerProfile/> </ProtectedComp>}></Route>
        <Route path='/admin-profile' element={<ProtectedComp defaultSelectionKey="3"> <AdminProfile/> </ProtectedComp>}></Route>
        <Route path='/partner-profile' element={<ProtectedComp defaultSelectionKey="3"> <PartnerProfile/> </ProtectedComp>}></Route>
        <Route path='/admin-page' element={<ProtectedComp defaultSelectionKey="2"> <AdminPage/> </ProtectedComp>}></Route>
        <Route path='/partner-page' element={<ProtectedComp defaultSelectionKey="2"> <PartnerPage/> </ProtectedComp>}></Route>
        <Route path='/movie/:movieId' element={<ProtectedComp defaultSelectionKey="0"> <MoviePage/> </ProtectedComp>}></Route>
        <Route path='/book-show/:showId' element={<ProtectedComp defaultSelectionKey="0"> <BookingPage/> </ProtectedComp>}></Route>
        <Route path='/booking-confirmation/:bookingId' element={<ProtectedComp defaultSelectionKey="0"> </ProtectedComp>}></Route>
      </Routes>
    </ConfigProvider>
  )
}

export default App
