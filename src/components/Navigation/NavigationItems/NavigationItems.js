import React from 'react';
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
                        <Nav.Link href="/">Inicio</Nav.Link>
                        <Nav.Link href="/trip/create">Nuevo anuncio</Nav.Link>
                        <Nav.Link href="/twitter">Twitter</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <GoogleLogout
                    clientId="171691482972-t86ek8jvfcgcvaebv7ja5d32t3rl58fa.apps.googleusercontent.com"
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