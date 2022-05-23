import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

function App() {

  const [user, setUser] = useState(sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')) : null ); // Tạo state chứa thông tin người dùng
  // useEffect(() => {

  // }, [user])

  return (
    <div >
      <Routes>
        <Route exact path='/' element={<HomePage  user={user} setUser={setUser} />} ></Route>
        <Route exact path='/login' element={<Login user={user} setUser={setUser} />} ></Route>
        <Route exact path='/signup' element={<SignUp />} ></Route>
      </Routes>
    </div>
  );
}

export default App;
