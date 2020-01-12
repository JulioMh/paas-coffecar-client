import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import CoffeeCarLogo from '../../Logo/CoffeeCarLogo.png';
import { GoogleLogout } from 'react-google-login';





const navigationItems = (props) => {
    let nav = null;

    const logout = () => {
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
                    onLogoutSuccess={logout}
                />
            </Navbar>
        );
    }

    return (
        <div>
            {nav}
        </div>
    );
}


export default navigationItems;