import React, { Component } from 'react'
import Header from './Header';
//import Navigation from './Navigation';
import Router from './MainRouter';
import EventBus from './Services/EventBus';

export default class App extends Component {
  state = {
    token : null
  }

  componentWillMount() {
    EventBus.getEventEmitter().on('authenticated',(payload)=>{
      console.log("payload",payload)
      this.setState({token : payload});
    })

    /*
    EventBus.getEventEmitter().on('authenticated', function(payload) {
      this.setState({
        token : payload
      });
    }.bind(this));
    */
  }



  render() {
    const { token } = this.state;
    return (
      
      <div>
        <Header token={token}/>
        
        
        <Router/>
      </div>
    )
  }
}
