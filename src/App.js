import React, { Component } from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './containers/Home/Home';
import Trip from './containers/TripRoot/TripRoot';
import Error from './components/Error/Error';
import Welcome from './containers/Welcome/Welcome'
import Navigation from './components/Navigation/NavigationItems/NavigationItems';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


class App extends Component {

  state = {
    logged: false
  }

  logged = () => {
    this.setState(prevState => ({
      logged: !prevState.logged,
    }))
  }


  render() {
    return (
      <BrowserRouter>
        <div>
          <header>
            <Navigation logOut={this.logged} logged={this.state.logged} />
          </header>
          <Switch>
            <Route path="/home" component={Home} exact />
            <Route path="/trip/:id" component={Trip} />
            <Route path="/create-trip" component={Trip} />
            <Route exact path="/">
              {this.state.logged ? <Redirect to="/home" /> : <Welcome logged={this.logged} />}
            </Route>
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
};

export default App;
