import React from 'react';
import { Target } from './components/target';
import { random } from './components/helper'; 
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: false,
      targets: [],
      latestClick: 0,
      sum: 0,
      clock: 0
    };

    this.hitTarget = this.hitTarget.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {    
    this.intervals = [];   
  }

  // componentWillUpdate(nextProps, nextState) {
  //   const yellow = 'rgb(255, 215, 18)';    
  //   if (document.body.style.background !== yellow && this.state.sum >= 100) {
  //     document.body.style.background = yellow;
  //   }
  //   if (document.body.style.background !== "red" && this.state.sum <= -10) {
  //     document.body.style.background = "red";
  //   }
  // }

  componentWillUnmount(prevProps, prevState) { 
      this.intervals.forEach((timeID) => {
        clearInterval(timeID);
      });  
       clearInterval(this.timeID);   
  }

  createTarget(ms) { 
   const index = this.state.targets.length;   

    this.intervals.push(
      setInterval( () => {
        let targets = this.state.targets.slice();
        let num = random(0, 1000) / 100;       
        targets[index] = targets[index]? 0 : num ;
        this.setState({ targets });
      }, ms));
  }

  hitTarget(e) {
    if (e.target.className !== 'target') return;   
    if (isNaN(e.target.innerText)) return;

    let num = Number(e.target.innerText);

    let sum = Number(this.state.sum);

    sum = (sum + num).toFixed(2);

    this.setState({ 
      latestClick: num, 
      sum 
    }); 

    this.createTarget( random(500, 3000) );  
  }

  handleClick() {
    if(this.state.game) {
      this.endGame();
    } else {
      this.startGame();
    }
  }

  startGame() {
    this.createTarget(1000);
    this.createTarget(1500);
    this.createTarget(2000);

    let startTime = Date.now() - this.state.clock;
    this.timeID = setInterval(() => { 
        this.setState({
         clock: Date.now() - startTime
       });         
     }, 10);  

    this.setState({
      game: true
    });
  }

  endGame() {
    this.intervals.forEach((int) => {
      clearInterval(int);
    });  

  clearInterval(this.timeID);  
  
  this.setState({
     game: false,
     targets: [],
     latestClick: 0,
     sum: 0,
     clock: 0
    });
  }

  render() {
  const {game, targets, latestClick, sum, clock} = this.state;

    return (
      <div>
        <h1>
          最近一次/ Last time: {latestClick}
        </h1>
        <label>{clock}ms</label><br/>
        <div  className='total'>
          已经抢到的红包/ Total: {sum}
        </div>
        <button onClick={this.handleClick}>
          {game ? '结束游戏/End' : '开始游戏/Start'} 
        </button>
        <div className="targetArea" onClick={this.hitTarget}>
          {     
            targets.map( (num,i) => 
              (<Target 
                number={num} 
                key={i} 
              />)
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
