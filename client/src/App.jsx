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
import BookingConfirmation from './components/BookingConfirmation';
import BookingHistory from './components/BookingHistory';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <ConfigProvider
      theme={{
        token:{
          colorPrimary: "#f84464",
          colorPrimaryHover: "#ff496b",
        },
      }}
    >
      <Routes>
        <Route path='/register/:role' element={<Register/>}></Route>
        <Route path='/login/:role' element={<Login/>}></Route>
        <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
        <Route path='/reset-password' element={<ResetPassword/>}></Route>
        <Route path='/reset-password/:role'></Route>
        <Route path='/' element={<ProtectedComp defaultSelectionKey="1"> <Home/> </ProtectedComp>}></Route>
        <Route path='/customer-profile' element={<ProtectedComp defaultSelectionKey="3"> <CustomerProfile/> </ProtectedComp>}></Route>
        <Route path='/admin-profile' element={<ProtectedComp defaultSelectionKey="3"> <AdminProfile/> </ProtectedComp>}></Route>
        <Route path='/partner-profile' element={<ProtectedComp defaultSelectionKey="3"> <PartnerProfile/> </ProtectedComp>}></Route>
        <Route path='/admin-page' element={<ProtectedComp defaultSelectionKey="2"> <AdminPage/> </ProtectedComp>}></Route>
        <Route path='/partner-page' element={<ProtectedComp defaultSelectionKey="2"> <PartnerPage/> </ProtectedComp>}></Route>
        <Route path='/movie/:movieId' element={<ProtectedComp defaultSelectionKey="0"> <MoviePage/> </ProtectedComp>}></Route>
        <Route path='/book-show/:showId' element={<ProtectedComp defaultSelectionKey="0"> <BookingPage/> </ProtectedComp>}></Route>
        <Route path='/booking-confirmation/:bookingId' element={<ProtectedComp defaultSelectionKey="0"> <BookingConfirmation/> </ProtectedComp>}></Route>
        <Route path='/bookings' element={<ProtectedComp defaultSelectionKey="0"> <BookingHistory/> </ProtectedComp>}></Route>
      </Routes>
    </ConfigProvider>
  )
}

export default App
