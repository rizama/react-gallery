import React, { Fragment } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Navbar from './parts/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Album from './pages/Album';
import Favorite from './pages/Favorite';
import User from './pages/User';
import { Provider } from 'react-redux';
import { store } from './configs/redux';
import NotFound from './pages/NotFound';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/albums/:id" component={Album} />
            <Route path="/favorite" component={Favorite} />
            <Route path="/user/:id" component={User} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
