import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import classes from './Welcome.module.css';
import { Image, Card } from 'react-bootstrap';
import CoffeeCarLogo from '../../components/Logo/CoffeeCarLogo.png'


class Welcome extends Component {

    state = {
        loginError: false,
        redirect: false
    };

    createOrKeepUser(postData) {
        fetch("" + postData.email)
            .then((response) => {
                if (!response.ok) {
                    let user = {
                        name: postData.name,
                        email: postData.email
                    };

                    fetch("https://",
                        {
                            method: 'post',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            },
                            body: JSON.stringify(user)
                        })
                        .then((result) => {
                            if (result.ok) {
                                fetch("https://" + postData.email)
                                    .then((result) => {
                                        console.log("creado");
                                        return result.json();
                                    })
                            }
                        });

                }
                return response.json();
            })
            .then((myJson => {
                //prueba
                console.log(myJson);
                this.setState({ redirect: true })
                //sessionStorage.setItem('user', myJson);
            }));
    }

    signup(res) {
        let postData;
        if (res.w3.U3) {
            postData = {
                name: res.w3.ig,
                email: res.w3.U3,
            };
        }

        if (postData) {
            this.createOrKeepUser(postData);
        }
    }

    render() {

        if (this.state.redirect || sessionStorage.getItem('user')) {
            return (<Redirect to={'/home'} />)
        }

        const responseGoogle = (response) => {
            console.log("google console");
            console.log(response);
            this.signup(response);
        }

        return (
            <div className={classes.contenedor}>
                <Card style={{ width: '100%', margin: 'auto', marginTop: '70px', boxShadow: "5px 5px 5px grey" }}>
                    <div className={classes.center}>
                        <h1>Welcome to CoffeeCar</h1>
                        <Image src={CoffeeCarLogo} />
                        <GoogleLogin
                            clientId="614940743476-2hc47higdlfhia4v8d6o4tstjpuc5kd0.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle} />
                    </div>
                </Card>
            </div>

        );
    }
}
export default Welcome;