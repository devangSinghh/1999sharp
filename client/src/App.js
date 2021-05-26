import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'

import Calendar from './components/calendar'
import Dashboard from './containers/dashboard'
import './sass/main.scss'
import Cookie from 'js-cookie'


//importing components

//import dynamic title Component
import Title from './common/Title'

const withTitle = ({ component: Component, title }) => {
  return class Title extends Component {
      render() {
          return (
              <React.Fragment>
                  <Title title={title} />
                  <Component {...this.props} />
              </React.Fragment>
          );
      }
  };
};

function App() {
  const boxen = require('boxen')

  useEffect(() => {
    console.log(boxen('WELCOME TO 1999Sharp!!', {padding: 1, margin: 1, borderStyle: 'double'}))
  }, [])

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Calendar} />
          <Route path="/home" component={Dashboard} />
        </Switch>
        </Router>
    </div>
  );
}

export default App;
