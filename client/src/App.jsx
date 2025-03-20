import {Route, Routes} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedComp from './components/ProtectedComp';

function App() {
  return (
    <Routes>
      <Route path='/' element={<ProtectedComp>  <Home/> </ProtectedComp>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
  )
}

export default App
