import React from 'react';
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import './App.css';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  const user = true;

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products/:category' element={<ProductList />} />
      <Route path='/product/:id' element={<Product />} />
      <Route path='/cart' element={<Cart />} />
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
    </Routes>
  );
}

export default App;
