import React, { Component } from 'react';
import classes from './App.css';

import Form from './containers/Form/Form.js';


class App extends Component {
  render() {
    return (
        <div className={classes.App}>
          <Form/>
        </div>
    );
  }
}

export default App;
