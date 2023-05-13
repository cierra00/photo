import React, {useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {CgProfile} from 'react-icons/cg'
import {auth} from '../../config/firebase'
import {signOut} from 'firebase/auth';
import { UserAuth } from '../../components/context/AuthContext'


import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBCollapse
} from 'mdb-react-ui-kit';
function Header() {

  const { user, createUser, signIn } = UserAuth();
  const logOut = async () => {
    try{
        await signOut(auth);
    } catch (err){
        console.error(err);
    }
}
  return (
    <>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a class="navbar-brand" href="/"><Navbar.Brand href="/home">Photo Saver</Navbar.Brand></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/profile">Profile</a>
          </li>
          
          <li class="nav-item">
            {!user? <a class="nav-link" href="/user-login">Login</a> : <a class="nav-link" href="/user-login" onClick={logOut}>Logout</a> }
          </li>
          
          
        </ul>
        <form class="form-inline my-2 my-lg-0">
          
         
        </form>
      </div>
    </nav>
      
    </>
  )
}

export default Header
