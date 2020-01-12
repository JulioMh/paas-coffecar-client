import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class Home extends Component {

    render() {
        if (!sessionStorage.getItem('user')) {
            return (<Redirect to={'/'} />)
        }
        return (
            <h1>Home</h1>
        );
    }
}

export default Home;