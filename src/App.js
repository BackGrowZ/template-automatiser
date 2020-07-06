import React, { Component } from 'react'
import Template from './component/Template/Template'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import history from './component/LinkCustomer/history';


export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path='/' component={Template} />
        </Switch>
      </Router>

    )
  }
}
