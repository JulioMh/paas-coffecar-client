import React from 'react';
import axios from '../../axios-orders';
import Aux from '../Aux/Aux';


const withHandleError = (WrappedComponent) => {
    return class extends React.Component {
        state = {
            error: null,
        };


        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(null, error => {
                this.setState({ error: error })
            });
        };

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        };

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        };

        showError = () => {
            alert(this.error.message);
        }

        render() {
            return (
                <Aux>
                    {this.state.error ? this.showError : null}
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        };
    };
};

export default withHandleError;