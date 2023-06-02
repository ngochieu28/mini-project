import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './Page/Home';
import Login from './Page/Login';
import SignUp from './Page/Sigin'
import Admin from './Page/Admin';
import Product from './Page/Product';

import User from './Page/Users';
import AdminPage from './Page/Admin/AdminPage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />}>
          <Route index element={<AdminPage />} />
          <Route path={`product`} element={<Product />} />
          <Route path={`user`} element={<User />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/product' element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
