import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import Trip from './containers/TripRoot/TripRoot';
import Error from './components/Error/Error';
//import Navigation from './components/Navigation/NavigationItems/NavigationItems'

function App() {
  return (
    <BrowserRouter>
      <div>
        
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/trip/:id" Trip={Trip} />
          <Route path="/create-trip" component={Trip} />
          <Route component={Error} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
