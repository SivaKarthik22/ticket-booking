import {Route, Routes} from 'react-router-dom';
import { ConfigProvider } from "antd";
import { lazy, Suspense} from 'react';
import './styles/component-styles.css';

import ProtectedComp from './components/ProtectedComp'; 
import LoadingComp from './components/LoadingComp';
import Home from './components/Home';

//const Home = lazy(()=> import('./components/Home'));
//const LoadingComp = lazy(()=> import('./components/LoadingComp'));
//const ProtectedComp = lazy(()=> import('./components/ProtectedComp'));

const Register = lazy(()=> import('./components/Register'));
const Login = lazy(()=> import('./components/Login'));
const CustomerProfile = lazy(()=> import('./components/Customer/CustomerProfile'));
const AdminProfile = lazy(()=> import('./components/Admin/AdminProfile'));
const PartnerProfile = lazy(()=> import('./components/Partner/PartnerProfile'));
const AdminPage = lazy(()=> import('./components/Admin/AdminPage'));
const PartnerPage = lazy(()=> import('./components/Partner/PartnerPage'));
const MoviePage = lazy(()=> import('./components/MoviePage'));
const BookingPage = lazy(()=> import('./components/BookingPage'));
const BookingConfirmation = lazy(()=> import('./components/BookingConfirmation'));
const BookingHistory = lazy(()=> import('./components/BookingHistory'));
const ForgotPassword = lazy(()=> import('./components/ForgotPassword'));
//const ResetPassword = lazy(()=> import('./components/ResetPassword'));


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
      <Suspense fallback={<SuspenseFallback/>}>
        <Routes>
          <Route path='/register/:role' element={<Register/>}></Route>
          <Route path='/login/:role' element={<Login/>}></Route>
          <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
          {/* <Route path='/reset-password' element={<ResetPassword/>}></Route> */}
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
      </Suspense>
      
    </ConfigProvider>
  )
}

export default App

function SuspenseFallback(){
  return(
    <div className='page-center'>
      <LoadingComp/>
    </div>
  );
}
