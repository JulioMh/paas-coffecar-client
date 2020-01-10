import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { PostData } from '../../services/PostData';
import { Redirect } from 'react-router-dom';
import './Welcome.css';


class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginError: false,
            redirect: false
        };
        this.signup = this.signup.bind(this);
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
            PostData('signup', postData).then((result) => {
                let responseJson = result;
                sessionStorage.setItem("userData", JSON.stringify(responseJson));
                this.setState({ redirect: true });
            });
        } else { }
    }

    render() {

        if (this.state.redirect || sessionStorage.getItem('userData')) {
            return (<Redirect to={'/home'} />)
        }

        const responseGoogle = (response) => {
            console.log("google console");
            console.log(response);
            this.signup(response);
        }

        return (

            <div className="row body">
                <div className="medium-12 columns">
                    <div className="medium-12 columns">
                        <h2 id="welcomeText"></h2>

                        <GoogleLogin
                            clientId="Your Google ID"
                            buttonText="Login with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle} />

                    </div>
                </div>
            </div>
        );
    }
}
export default Welcome;