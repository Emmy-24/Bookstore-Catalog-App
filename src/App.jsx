import React, { createContext, useContext, useState } from 'react'
import './App.css'
import {Router, Routes, Route } from 'react-router';
import Header from './Components/Header';
import Footer from './Components/Footer';
import AdminRoute from './Pages/AdminRoute';
import BookDetails from './Components/BookCard';
import Home from './Pages/Home';
import About from './Pages/About';
import Shop from './Pages/Shop';
import Login from './Pages/Login';
import Hero from './Pages/Hero';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

function App() {

  return (
    <>
    
      <div className="app-container">
        <Header />

          <Routes>
            <Route path="/" element={<Hero/>} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<Login />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/admin" element={<AdminRoute/>} />
          </Routes>

        <Footer/>
      </div>
  </>
  )
}

export default App
