
import React, { Component } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Trips from "../../components/Trips/Trips";
import { Redirect } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
import Trip from '../TripRoot/TripRoot';
import axios from '../../axios-orders';
import "../../components/Trips/Trips.module.css";


class Home extends Component {
  constructor() {
      super();
    this.state = {
      tripsAvailable: [],
      myTrips: []
    };
  }

  

  componentDidMount() {
    
    
    fetch("http://coffeecar.herokuapp.com/api/announces") 
      .then(response => {
        return response.json();
      })
      .then(myTrips => {
        console.log(myTrips)
        this.setState({ myTrips});
      });
    fetch("announces/search/findByDriverEmailNot?email=" + sessionStorage.user.email)
      .then(response => {
        return response.json();
      })
      .then(tripsAvailable => {
        console.log(tripsAvailable);
        this.setState({ tripsAvailable});
      });
  }


  render() {
  if (!sessionStorage.getItem('user')) {
            return (<Welcome logged={this.logged} />)
        }
    console.log(sessionStorage.user);   
    return (
      <div>
        <div className="content-section introduction">
          <div className="feature-intro">
            <br></br>
          </div>
        </div>

        <div className="content-section implementation" aling-items="center"
          y
          justify-content="center">
          <TabView renderActiveOnly={true} style={{align: 'center', margin: 'auto'}} >
            <TabPanel header="Trips available" leftIcon="pi pi-home" style={{align: 'center', margin: 'auto'}}>
              <Trips trips={this.state.tripsAvailable}></Trips>
            </TabPanel>
            <TabPanel header="My Trips" leftIcon="pi pi-user">
              <Trips trips={this.state.myTrips}></Trips>
            </TabPanel>
          </TabView>
        </div>
      </div>
    );
  }
/*
    state = {
        trips: null,
        trip: false
    }

    componentDidMount() {        
        if (!this.state.trips) {
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

    render() {

        let trip = null;
        if (this.state.trip) {
            trip = <Trip item={this.state.trip[this.state.trip.length - 1]} />;
        }
        return (
            <div>
                {trip}
            </div>
        );
    }*/

}

export default Home;
