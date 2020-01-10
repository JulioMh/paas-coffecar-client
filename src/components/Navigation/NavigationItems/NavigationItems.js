import React from 'react';
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
                    width="75px"
                    height="75px"
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