
import './App.css';
import { Home } from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { UserDetails } from './pages/UserDetails';
import { ItemDetails } from './pages/ItemDetails';
import MyCart from './pages/MyCart';
import EmailVerify from './auth/EmailVerify';
import { ForgetPasswort } from './pages/ForgetPasswort';
import { ResetPassword } from './auth/ResetPassword';
import { Admin } from './admin/Admin';
import { OrderList } from './admin/OrderList';
import Layouts from './components/Layouts';

import { ItemList } from './admin/ItemList';
import UpdateItem from './admin/UpdateItem';
import { Helmet } from 'react-helmet';
import Success from './pages/Success';
import Failed from './pages/Failed';
import EmailCheckMessage from './pages/EmailCheckMessage';
import ItemUpload from './admin/ItemUpload';
import { AdminDashboard } from './admin/AdminDashboard';
import { ProceedToPay } from './pages/ProceedToPay';
import UpdateUserDetails from './pages/UpdateUserDetails';
import UserList from './admin/UserList';






function App() {
  return (
    <>
      <Helmet>
        <title>Online Food Ordering App</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Layouts />} >
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgetpassword' element={<ForgetPasswort />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='email/confirmation/:token' element={<EmailVerify />} />
            <Route path='/itemdetails/:item_id' element={<ItemDetails />} />
            <Route path='userdetails/:user_id' element={<UserDetails />} />
            <Route path='mycart' element={<MyCart />} />
            <Route path='success' element={<Success />} />
            <Route path='failed' element={<Failed />} />
            <Route path='emailcheckmessage' element={<EmailCheckMessage />} />
            <Route path='resetpassword/:token' element={<ResetPassword />} />
            <Route path='proceedToPay' element={<ProceedToPay />} />
            <Route path='udpadeUserDetail/:id' element={<UpdateUserDetails />} />
          </Route>

          <Route path='admin/' element={<AdminDashboard />} >
            <Route path='dashboard' element={<Admin />} />
            <Route path='orderlist' element={<OrderList />} />
            <Route path='itemupload' element={<ItemUpload />} />
            <Route path='itemlist' element={<ItemList />} />
            <Route path='itemupdate/:id' element={<UpdateItem />} />
            <Route path='userlist' element={<UserList />} />
          </Route>
        </Routes>
      </BrowserRouter >

    </>
  );
}

export default App;
