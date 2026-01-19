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

function App() {
  

  return (
    <>
      <Menu />

      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/cart" element={ <Cart /> } />
        <Route path="/product/:product_id" element={ <ProductDetail /> } />
        <Route path="/admin" element={ <AdminHome /> } />
        <Route path="/admin/add-product" element={ <AddProduct /> } />
        <Route path="/admin/manage-categories" element={ <ManageCategories /> } />
        <Route path="/admin/manage-products" element={ <ManageProducts /> } />
        <Route path="/admin/edit-product" element={ <EditProduct /> } />
        <Route path="/*" element={ <NotFound /> } />
      </Routes>

    </>
  )
}

export default App
