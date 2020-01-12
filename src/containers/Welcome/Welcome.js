import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import classes from './Welcome.module.css';
import { Image, Card } from 'react-bootstrap';
import CoffeeCarLogo from '../../components/Logo/CoffeeCarLogo.png';
import axios from '../../axios-orders';


class Welcome extends Component {

    state = {
        loginError: false,
        redirect: false
    };

    signup(res) {
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
                    console.log(response)
                    if (response.data === "") {
                        let user = {
                            name: postData.name,
                            email: postData.email
                        };
                        console.log("antes de crearlo")
                        axios.post("users", user)
                            .then((result) => {
                                console.log("creado");
                                console.log(result.data);
                                return result.data;
                            });
                    }
                    console.log("ya esraba creado y antes de devolver")
                    return response.data;

                }
                ).then((myJson) => {
                    console.log(myJson);
                    sessionStorage.setItem('user', JSON.stringify(myJson));
                    console.log("guardado en sesion")
                    this.setState({ redirect: true })
                    //this.isAutenticated();
                    //this.props.history.push('/home');
                })
        }
    }

    /*componentDidMount() {
        this.isAutenticated();
    }

    isAutenticated() {
        if (sessionStorage.getItem('user')) {
            axios.get("users/search/findByEmail?email=" + sessionStorage.getItem('user').email)
                .then((response) => {
                    if (response.data !== "") {
                        console.log("is authenticated")
                        this.setState({ redirect: true })
                    } else {
                        console.log("not authenticated")
                        this.setState({ redirect: false })
                    }
                })
        } else {
            console.log("not sig in")
            this.setState({ redirect: false })
        }
    }*/

    render() {

        let redirect = null;
        if (this.state.redirect || sessionStorage.getItem('user')) {
            redirect = (<Redirect to='/home' />)
        }

        const responseGoogle = (response) => {
            console.log("google console");
            console.log(response);
            this.signup(response);
        }

        return (
            <div className={classes.contenedor}>
                {redirect}
                <Card style={{ width: '100%', margin: 'auto', marginTop: '70px', boxShadow: "5px 5px 5px grey" }}>
                    <div className={classes.center}>
                        <h1>Welcome to CoffeeCar</h1>
                        <Image src={CoffeeCarLogo} className={classes.imgLogo} />
                        <GoogleLogin
                            clientId="614940743476-2hc47higdlfhia4v8d6o4tstjpuc5kd0.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            theme="dark"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle} />
                    </div>
                </Card>
            </div>

        );
    }
}
export default Welcome;