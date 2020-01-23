import React from 'react';
<<<<<<< HEAD
import { Navbar, Nav } from 'react-bootstrap';
import CoffeeCarLogo from '../../Logo/CoffeeCarLogo.png'
//import { NavLink } from 'react-router-dom';

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
                    <Nav.Link href="#link">Log out</Nav.Link>                    
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationItems;
=======
import { Navbar, Nav, Image } from 'react-bootstrap';
import CoffeeCarLogo from '../../Logo/CoffeeCarLogo.png';
import { Redirect } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

const navigationItems = (props) => {
    let nav = null;

    const logOut = () => {
        sessionStorage.removeItem('user');
        props.logOut();
    }

    if (props.logged) {
        nav = (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/home">
                    <Image src={CoffeeCarLogo} rounded style={{ width: '65px' }} />
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
                    onLogoutSuccess={logOut}
                />
            </Navbar>
        );
    } else {
        nav = <Redirect to="/" />;
    }

    return (
        <div>
            {nav}
        </div>
    );
}


export default navigationItems;
>>>>>>> trip-root
