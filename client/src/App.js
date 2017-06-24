import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <a href='https://slack.com/oauth/authorize?scope=incoming-webhook,commands,bot&client_id=188005782946.189109978850'>
          <img src='img/add_to_slack.png' srcset='assets/img/add_to_slack.png 1x, assets/img/add_to_slack@2x.png 2x' alt='Add to Slack button' style={{margin: '0 auto', display: 'block'}} height='40' width='139'/>
        </a>
        <img src='img/ra.png' alt='Remote Apprentice Logo' className='img-responsive'/>
      </div>
    );
  }
}

export default App;
