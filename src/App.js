import React from 'react';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Header from './pages/Sections/Header';
import Footer from './pages/Sections/Footer'
import NotFound from './pages/NotFound';
import ProfilePage from './pages/ProfilePage';
import ManagePage from './pages/ManagePage';
import './App.css'


export default function App() {
 
  return (
    <>
      <BrowserRouter>
      <Header />
      <Routes>
       <Route path="/" element={<HomePage />}></Route>
       <Route path="/login" element={<LoginPage />}></Route>
       <Route path="/profile" element={<ProfilePage />}></Route>
       <Route path="*" element={<NotFound />}></Route>
       <Route path="/photo/:id" element={<NotFound />}></Route>
      </Routes>
      <Footer />
      </BrowserRouter>
    </>
  )}


