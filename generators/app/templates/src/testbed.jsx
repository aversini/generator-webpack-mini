import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './testbed.css';

/**
 * Your imports here. For example:
 *
 * import 'some-lib/lib/Typography/Typography.css';
 * import {Button, BadgeButton} from 'some-lib';
 *
 */

class App extends Component {
  componentDidMount() {
    // App is ready, show the page
    document.body.classList.remove('tb-hidden');
  }
  render() {
    return (
      <div>
        {/* your code here */}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
