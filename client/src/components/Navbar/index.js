import React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../Context';
const logo = require('../../Writesharelogosmaller.png');


const Navbar = props => {
  return (
    <>
      <nav className="top-nav blue-grey darken-4">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo"><img className="logo" src={logo} alt="logo" /></Link>
          <ul className="right">
          <AppContext.Consumer>
          {value => {
            const {currentUser, handleLogout} = value;
            return !currentUser ? (
            <>
            <li><Link to="/register" className="main-button-font waves-effect waves-green btn lime accent-2 black-text">Register</Link></li>
            <li><Link id="login-button" to="/login" className="main-button-font waves-effect waves-red btn light-green accent-2 black-text">Login</Link></li>
            </>
          ):(
            <li><button id="logout-button" onClick={handleLogout} className="main-button-font waves-effect waves-yellow btn purple lighten-2 black-text" >Log Out</button></li>
          )}}
          </AppContext.Consumer>
          </ul>
        </div>
      </nav>

    </>
  )
}

export default Navbar;