// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProductsPage from "./pages/ProductsPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Rewards from "./pages/Rewards";
import SecondhandGoods from "./pages/SecondhandGoods";
import AddSecondhandProduct from "./pages/AddSecondhandProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        <Route path="/products" element={
          <ProtectedRoute><ProductsPage /></ProtectedRoute>
        } />
        
        <Route path="/secondhand" element={
          <ProtectedRoute><SecondhandGoods /></ProtectedRoute>
        } />
        
        <Route path="/add-secondhand" element={
          <ProtectedRoute><AddSecondhandProduct /></ProtectedRoute>
        } />
        
        <Route path="/cart" element={
          <ProtectedRoute><Cart /></ProtectedRoute>
        } />
        
        <Route path="/rewards" element={
          <ProtectedRoute><Rewards /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}