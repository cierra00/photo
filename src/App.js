import React from 'react';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Header from './pages/Sections/Header';
import Footer from './pages/Sections/Footer'
import NotFound from './pages/NotFound';
import ProfilePage from './pages/ProfilePage';


import './App.css'
import { AuthContextProvider } from './components/context/AuthContext';


export default function App() {
 
  return (
    <>
    <AuthContextProvider>
    <BrowserRouter>
    <Header />
    <Routes>
     <Route path="/" element={<LoginPage />} />
     <Route path="/home" element={<HomePage />} />
     <Route path="/user-login" element={<LoginPage />} />
     <Route path="/profile" element={<ProfilePage />} />
     
     
   </Routes>
    <Footer />
    </BrowserRouter>
       </ AuthContextProvider>
    </>
  )}


