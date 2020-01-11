import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import CoffeeCarLogo from '../../Logo/CoffeeCarLogo.png';
import { GoogleLogout } from 'react-google-login';
//import { NavLink } from 'react-router-dom';

const logout = () => {
    sessionStorage.removeItem('user');
}

const NavigationItems = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">
                <img
                    alt=""
                    src={CoffeeCarLogo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
            </Navbar.Brand>
            <Navbar.Brand href="/">CoffeeCar</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>                  
                </Nav>
            </Navbar.Collapse>
            <GoogleLogout
                clientId="614940743476-2hc47higdlfhia4v8d6o4tstjpuc5kd0.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={logout}
            />
        </Navbar>
    );
}

export default NavigationItems;