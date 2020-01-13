import React, { Component } from 'react';
import Trip from '../TripRoot/TripRoot';
import axios from 'axios';

class Home extends Component {

    state = {
        trips: null,
        trip: false
    }

    componentDidMount() {        
        if (!this.state.trips) {
            console.log("ola")
            axios.get("https://coffeecar.herokuapp.com/api/announces")
                .then(res => { this.setState({ trip: res.data }) })
        }
    }

    viewTrip = () => {
        return (
            this.setState({ trip: true })
        );
    }

    render() {
        console.log(this.state)
        let trip = null;
        if (this.state.trip) {
            trip = <Trip item={this.state.trip[this.state.trip.length - 1]} />;
        }
        return (
            <div>
                {trip}
            </div>
        );
    }
}

export default Home;