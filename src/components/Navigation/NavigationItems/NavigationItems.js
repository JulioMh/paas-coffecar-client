import React, { Component } from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import CoffeeCarLogo from '../../Logo/CoffeeCarLogo.png';
import { GoogleLogout } from 'react-google-login';
import axios from '../../../axios-orders';
import { Redirect } from 'react-router-dom';

//import { NavLink } from 'react-router-dom';




class NavigationItems extends Component {


    /*state = {
        shouldActive: false
    }*/

    /*active() {
        console.log(sessionStorage.getItem('user'));
        if (sessionStorage.getItem('user') && sessionStorage.getItem('user') !== "") {
            console.log(JSON.parse(sessionStorage.getItem('user')).email);
            axios.get("users/search/findByEmail?email=" + JSON.parse(sessionStorage.getItem('user')).email)
                .then((response) => {
                    if (response.data !== "") {
                        console.log("is authenticated")
                        return true;
                    } else {
                        console.log("not authenticated")
                        return false;
                    }
                })
        } else {
            console.log("not sig in")
            return false;
        }
    }*/

    /*componentDidMount() {
        console.log(sessionStorage.getItem('user'));
        if (sessionStorage.getItem('user') && sessionStorage.getItem('user') !== "") {
            console.log(JSON.parse(sessionStorage.getItem('user')).email);
            axios.get("users/search/findByEmail?email=" + JSON.parse(sessionStorage.getItem('user')).email)
                .then((response) => {
                    if (response.data !== "") {
                        console.log("is authenticated")
                        this.setState({shouldActive: true});
                    } else {
                        console.log("not authenticated")
                        this.setState({shouldActive: false});
                    }
                })
        } else {
            console.log("not sig in")
            this.setState({shouldActive: false});
        }
    }*/

    

    render() {
        let nav = null;

        const logout = () => {
            sessionStorage.removeItem('user');
        }

        if (sessionStorage.getItem('user')) {
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
}

export default NavigationItems;