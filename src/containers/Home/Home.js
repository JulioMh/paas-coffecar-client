
import React, { Component } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Trips from "../../components/Trips/Trips";

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
                <div className="content-section implementation" aling-items="center"
                    y
                    justify-content="center">
                    <TabView renderActiveOnly={true} style={{ align: 'center', margin: 'auto' }} >
                        <TabPanel header="Trips available" leftIcon="pi pi-home">
                            <Trips
                                trips={this.state.tripsAvailable}
                                redirectToTrip={(tripId) => this.props.history.push(`/trip/${tripId}`)}></Trips>
                        </TabPanel>
                        <TabPanel header="My Trips" leftIcon="pi pi-user">
                            <Trips
                                trips={this.state.myTrips}
                                redirectToTrip={(tripId) => this.props.history.push(`/trip/${tripId}`)}></Trips>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        );
        }
}

export default Home;
