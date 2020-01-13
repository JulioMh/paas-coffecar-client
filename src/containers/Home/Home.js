import React, { Component } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Trips from "../../components/Trips/Trips";
import { Redirect } from "react-router-dom";

class Home extends Component {
  constructor() {
      super();
    this.state = {
      tripsAvailable: [],
      myTrips: []
    };
  }

  componentDidMount() {
    fetch(
      "http://coffeecar.herokuapp.com/api/announces/"
    )
      .then(response => {
        return response.json();
      })
      .then(tripsAvailable => {
        this.setState({ tripsAvailable});
      });
    fetch(
      "http://coffeecar.herokuapp.com/api/announces/"
    )
      .then(response => {
        return response.json();
      })
      .then(myTrips => {
        this.setState({ myTrips});
      });
  }

  render() {
  /*  if (!sessionStorage.getItem('user')) {
            return (<Redirect to={'/'} />)
        }*/
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
}

export default Home;
