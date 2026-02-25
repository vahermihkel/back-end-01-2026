import './App.css'
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/admin/AddProduct';
import ManageCategories from './pages/admin/ManageCategories';
import ManageProducts from './pages/admin/ManageProducts';
import EditProduct from './pages/admin/EditProduct';
import Menu from './components/Menu';
import AdminHome from './pages/admin/AdminHome';
import { useContext, useState } from 'react';
import CheckPayment from './pages/CheckPayment';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import MyOrders from './pages/auth/MyOrders';
import Profile from './pages/auth/Profile';
import WebSocket from './pages/WebSocket';
import { AuthContext } from './context/AuthContext';
import RequireAuth from './components/RequireAuth';
import RequireAdminAuth from './components/RequireAdminAuth';

function App() {
  const {loading} = useContext(AuthContext);
  const [darkTheme, setDarkTheme] = useState(localStorage.getItem("isDarkTheme") === "true");

  const handleDarkTheme = (newTheme: boolean) => {
    setDarkTheme(newTheme);
    localStorage.setItem("isDarkTheme", JSON.stringify(newTheme));
  }

  if (loading) {
    // võib ka loaderi või pildi panna
    return <div></div>
  }

  return (
    <div className={darkTheme ? "dark-theme" : undefined}>
      <Menu />
      <button onClick={() => handleDarkTheme(true)}>Tume</button>
      <button onClick={() => handleDarkTheme(false)}>Hele</button>

      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/cart" element={ <Cart /> } />
        <Route path="/product/:product_id" element={ <ProductDetail /> } />
        
        <Route element={ <RequireAdminAuth /> }>
          <Route path="/admin" element={ <AdminHome /> } />
          <Route path="/admin/add-product" element={ <AddProduct /> } />
          <Route path="/admin/manage-categories" element={ <ManageCategories /> } />
          <Route path="/admin/manage-products" element={ <ManageProducts /> } />
          <Route path="/admin/edit-product/:product_id" element={ <EditProduct /> } />
        </Route>

        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />

        <Route element={ <RequireAuth /> }>
          <Route path="/my-orders" element={ <MyOrders /> } />
          <Route path="/profile" element={ <Profile /> } />
        </Route>

        <Route path="/check-payment" element={ <CheckPayment /> } />
        <Route path="/websocket" element={ <WebSocket /> } />

        <Route path="/*" element={ <NotFound /> } />
      </Routes>

    </div>
  )
}

export default App
