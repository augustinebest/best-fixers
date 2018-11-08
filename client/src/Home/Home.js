import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <Fragment>
        <div className='App-body'>
          <p> Feel free to <NavLink to='/requestService'> Request </NavLink> a service </p>
        </div>
      </Fragment >
    )
  }
}

export default App;