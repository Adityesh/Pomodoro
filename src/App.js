import React from 'react';

import './App.css';

const audio = document.getElementById('beep');
class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.loop = undefined
  }
  
  state = {
    breakCount : 5,
    sessionCount : 25,
    isPlaying : false,
    timeLeft : 25 * 60,
    timeLabel : 'Session',
  }
  
calcTime = (count) => {
  let minutes = Math.floor(count / 60);
    let seconds = count % 60;
      
    minutes = minutes < 10 ? ('0'+minutes) : minutes;
    seconds = seconds < 10 ? ('0'+seconds) : seconds;
    
    return `${minutes}:${seconds}`;
}

handleBreakDecrement = () => {
  let {breakCount, isPlaying} = this.state;
  if(breakCount > 1 && !isPlaying) {
    breakCount--;
    this.setState({
      breakCount : breakCount,
    })
  }
}

handleBreakIncrement = () => {
  let {breakCount,isPlaying} = this.state;
  if(breakCount < 60 && !isPlaying) {
    breakCount++;
    this.setState({
      breakCount : breakCount,
    })
  }
}

handleSessionDecrement = () => {
  let {sessionCount,isPlaying} = this.state;
  if(sessionCount > 1 && !isPlaying) {
    sessionCount--;
    this.setState({
      sessionCount : sessionCount,
      timeLeft : sessionCount * 60
    })
  }
}

handleSessionIncrement = () => {
  let {sessionCount,isPlaying} = this.state;
  if(sessionCount < 60 && !isPlaying) {
    sessionCount++;
    this.setState({
      sessionCount : sessionCount,
      timeLeft : sessionCount * 60
    })
  }
}

handlePlayPause = () => {
  let {isPlaying} = this.state
  
  if(isPlaying === true) {
    clearInterval(this.loop)
    this.setState({
      isPlaying : false
    })
  } else {
    this.setState({
      isPlaying : true
    })

    this.loop = setInterval(() => {
      const {timeLabel,timeLeft, sessionCount, breakCount} = this.state
      if(timeLeft === 0) {
        this.setState({
          timeLabel : (timeLabel === 'Session') ? 'Break' : "Session",
          timeLeft : (timeLabel === 'Session') ? (breakCount * 60) : (sessionCount * 60)
          
        })
  
        audio.play()
      } else {
        this.setState( {
          timeLeft : timeLeft -1
        })
      }
    }, 1000)
  }
  
}

handleReset = () => {
  this.setState( {
    breakCount : 5,
    sessionCount : 25,
    isPlaying : false,
    timeLeft : 25 * 60,
    timeLabel : 'Session',
  })

  clearInterval(this.loop);
    
    audio.pause();
    audio.currentTime = 0;
}
  
  render() {
    const {breakCount, sessionCount, isPlaying,timeLeft, timeLabel} = this.state
    return (
      <div className="content"> 
        <h1>POMODORO CLOCK</h1>
        <div className ="main" >
          <BreakTime breakCount = {breakCount} handleBreakDecrement={this.handleBreakDecrement} handleBreakIncrement={this.handleBreakIncrement}/>
          <SessionTime sessionCount = {sessionCount} handleSessionDecrement = {this.handleSessionDecrement} handleSessionIncrement = {this.handleSessionIncrement}/>
        </div>
        
        <div className="clock-container">
          <h1 id="timer-label">{timeLabel}</h1>
          <span id="time-left">{this.calcTime(timeLeft)}</span>
          <div className="buttons">
          <button id="start_stop" onClick={this.handlePlayPause}><i className="material-icons">{(isPlaying) ? 'pause' : 'play_arrow'}</i></button>
          <button id="reset" onClick={this.handleReset}><i className="material-icons">loop</i></button>
          </div>
          
        </div>
        <span className="about">Made by <a href="https://github.com/Adityesh" target="blank">Adityesh  </a><i className="material-icons">whatshot</i></span>
      </div>
    )
  }
}


const BreakTime = (props) => {
   return (
     <div id="break-label" className ="flex">
       <h1>Break Length</h1>
       <button id="break-decrement" onClick={props.handleBreakDecrement}><i className="material-icons">keyboard_arrow_down</i></button>
       <span id="break-length">{props.breakCount}</span>
       <button id="break-increment" onClick={props.handleBreakIncrement}><i className="material-icons">keyboard_arrow_up</i></button>
     </div>
   )
 }

const SessionTime = (props) => {
   return (
     <div id="session-label" className="flex">
       <h1>Session Length</h1>
       <button id="session-decrement" onClick={props.handleSessionDecrement}><i className="material-icons">keyboard_arrow_down</i></button>
       <span id="session-length">{props.sessionCount}</span>
       <button id="session-increment" onClick={props.handleSessionIncrement}><i className="material-icons">keyboard_arrow_up</i></button>
      </div>
   )
}

export default App
