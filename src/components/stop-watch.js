
import React from 'react';

class StopWatch extends React.Component {
  
  constructor(props) {
    super(props); 
    this.handleClock = this.handleClock.bind(this);
    this.handleClear = this.handleClear.bind(this);     
    this.state = {
      running: false, 
      clock: 0
    };
  } 

componentWillUnmount(){
    clearInterval(this.timeID);
}

  handleClock(){
    if (this.state.running) {      
      clearInterval(this.timeID);         
    } else {
       let startTime = Date.now() - this.state.clock;
       this.timeID = setInterval(() => { 
           this.setState({
            clock: Date.now() - startTime
          });         
        }, 0);        
    }
  this.setState({
      running: !this.state.running
   })
  }

  // handleClock= () => {
  //       this.setState(state => {         
  //       if (state.running) {
  //           clearInterval(this.timeID)
  //       } else {
  //           const startTime = Date.now() - state.clock;           
  //           this.timeID = setInterval(() => {                
  //               this.setState({
  //                   clock: Date.now() - startTime
  //               });
  //           })
  //       }
  //       return {running: !state.running}
  //       })
  //   }

  handleClear() {    
     clearInterval(this.timeID);     
     this.setState({
      running: false,
      clock: 0
     });     
  }


  render() {
       let {clock, running} = this.state;
    return (
      <div>
        <label>{clock}ms</label><br/>
        <button onClick = {this.handleClock}>{running? 'Stop': 'Start'}</button><br/>
        <button onClick = {this.handleClear}>clear</button>                      
      </div>       
    );
  }
}

export default StopWatch;




