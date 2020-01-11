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



class App extends Component {
  render() {
    const options = {
      center: { lat: 36.890257, lng: 30.707417 },
      zoom: 12
    };

    let nav = null;
    if(sessionStorage.getItem('user')){
      nav = <Navigation/>
    }
    return (
      <BrowserRouter>
        <div>
          <header>
            {nav}
          </header>
          <Switch>
            <Route path="/" component={Welcome} exact />
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
