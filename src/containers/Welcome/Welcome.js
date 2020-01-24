import React from 'react';
import GoogleLogin from 'react-google-login';
import classes from './Welcome.module.css';
import { Image, Card } from 'react-bootstrap';
import CoffeeCarLogo from '../../components/Logo/CoffeeCarLogo.png';
import axios from '../../axios-orders';

const welcome = (props) => {

    const signup = (res) => {
        console.log("signup");
        console.log(res)
        let postData;
        if (res.w3.U3) {
            postData = {
                name: res.w3.ig,
                email: res.w3.U3,
            };
        }

        if (postData) {
            axios.get("users/search/findByEmail?email=" + postData.email)
                .then((response) => {
                    if (response.data === "") {
                        let user = {
                            name: postData.name,
                            email: postData.email
                        };
                        axios.post("users", user)
                            .then((result) => {
                                return result.data;
                            });
                    }
                    return response.data;
                }
                ).then((myJson) => {
                    sessionStorage.setItem('user', JSON.stringify(myJson));
                    props.logged();
                })
        }
    }

    const responseGoogle = (response) => {
        console.log("responseGoogle");
        console.log(response);
        signup(response);
    }

    return (
        <div className={classes.contenedor}>
            <Card style={{ width: '100%', margin: 'auto', marginTop: '70px', boxShadow: "5px 5px 5px grey" }}>
                <div className={classes.center}>
                    <h1>¡Bienvenido a CoffeeCar!</h1>
                    <Image src={CoffeeCarLogo} className={classes.imgLogo} />
                    <GoogleLogin
                        clientId="614940743476-2hc47higdlfhia4v8d6o4tstjpuc5kd0.apps.googleusercontent.com"
                        buttonText="Login con Google"
                        theme="dark"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle} />
                </div>
            </Card>
        </div>
    );
}

export default welcome;

