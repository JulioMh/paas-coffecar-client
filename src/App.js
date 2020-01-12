import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import Trip from './containers/TripRoot/TripRoot';
import Error from './components/Error/Error';
import Welcome from './containers/Welcome/Welcome'
import Navigation from './components/Navigation/NavigationItems/NavigationItems';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import axios from './axios-orders';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <header>
            <Navigation/>
          </header>
          <Switch>          
            <Route path="/home" component={Home} exact />
            <Route path="/trip/:id" component={Trip} />
            <Route path="/create-trip" component={Trip} />
            <Route path="/" component={Welcome} exact />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
};

export default App;
