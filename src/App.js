import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import Trip from './containers/TripRoot/TripRoot';
import Error from './components/Error/Error';
import Wellcome from './containers/Wellcome/Wellcome'
import Navigation from './components/Navigation/NavigationItems/NavigationItems';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Map from './Map'
import { GMap } from 'primereact/gmap';



class App extends Component {
  render() {
    const options = {
      center: { lat: 36.890257, lng: 30.707417 },
      zoom: 12
    };
    return (
      <BrowserRouter>
        <div>
          <header>
            <Navigation />
          </header>
          <Map></Map>
          <GMap options={options} style={{ width: '100%', minHeight: '320px' }} />
          <Switch>
            <Route path="/" component={Wellcome} exact />
            <Route path="/home" component={Home} exact />
            <Route path="/trip/:id" component={Trip} />
            <Route path="/create-trip" component={Trip} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
};

export default App;
