
import React, { Component } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Trips from "../../components/Trips/Trips";
import ReactWeather from 'react-open-weather';
import 'react-open-weather/lib/css/ReactWeather.css';
import { Card } from 'react-bootstrap';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            tripsAvailable: [],
            myTrips: []

        };
    }

    componentDidMount() {
        let id = sessionStorage.user;
        console.log(id)
        fetch("http://coffeecar.herokuapp.com/api/announces/search/findByDriverId?id=" + JSON.parse(sessionStorage.user).id)
            .then(response => {
                return response.json();
            })
            .then(myTrips => {
                this.setState({ myTrips });
            });
        fetch("http://coffeecar.herokuapp.com/api/announces/search/findByDriverIdNot?id=" + JSON.parse(sessionStorage.user).id)
            .then(response => {
                return response.json();
            })
            .then(tripsAvailable => {
                this.setState({ tripsAvailable });
            });
    }

    render() {
        return (
            <div>
                <div className="content-section implementation" aling-items="center" justify-content="center">
                    <TabView renderActiveOnly={true} style={{ align: 'center', margin: 'auto' }} >
                        <TabPanel header="Viajes disponibles" leftIcon="pi pi-home">
                            <Trips
                                trips={this.state.tripsAvailable}
                                redirectToTrip={(tripId) => this.props.history.push(`/trip/${tripId}`)}></Trips>
                        </TabPanel>
                        <TabPanel header="Mis viajes" leftIcon="pi pi-user">
                            <Trips
                                trips={this.state.myTrips}
                                redirectToTrip={(tripId) => this.props.history.push(`/trip/${tripId}`)}></Trips>
                        </TabPanel>
                        <TabPanel header="Tiempo actual">
                            <Card style={{ width: '75%', margin: 'auto', marginTop: '50px', marginBottom: '50px', boxShadow: "5px 5px 5px grey" }}>
                                <Card.Body>
                                <ReactWeather
                                    forecast="today"
                                    apikey="14e9287d01828d9cc8128840206f9dc0"
                                    type="city"
                                    city="Malaga, ES" />
                                </Card.Body>
                            </Card >
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        );
    }
}

export default Home;
