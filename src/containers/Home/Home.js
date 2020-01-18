
import React, { Component } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Trips from "../../components/Trips/Trips";
import { Redirect } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
import Trip from '../TripRoot/TripRoot';
import axios from '../../axios-orders';


class Home extends Component {
  constructor() {
      super();
    this.state = {
      tripsAvailable: [],
      myTrips: []
    };
  }

  

  componentDidMount() {
    
    
    fetch("announces/search/findByDriverEmail?email=" + sessionStorage.user.email) 
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
            <h1>Home</h1>
            <p>Start to adventure</p>
          </div>
        </div>

        <div className="content-section implementation">
          <TabView renderActiveOnly={true}>
            <TabPanel header="Trips available" leftIcon="pi pi-calendar">
              <Trips trips={this.state.tripsAvailable}></Trips>
            </TabPanel>
            <TabPanel header="My Trips" rightIcon="pi pi-user">
              <Trips trips={this.state.myTrips}></Trips>
            </TabPanel>

            <TabPanel header="no funcional" disabled={true}></TabPanel>
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
    }*/

}

export default Home;
