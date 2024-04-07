import React, { useState, useEffect, useRef} from "react";

function StopWatch(){

  const [isRunning, setIsRunning] = useState(false);
  const [elapseTime, setElapseTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

useEffect (() => {

  if(isRunning){
    intervalIdRef.current = setInterval(() => {
      setElapseTime(Date.now() - startTimeRef.current);
    },10);
  }

  return () => {
    clearInterval(intervalIdRef.current);
  }

},[isRunning])

function handleStart(){
  setIsRunning(true);
  startTimeRef.current = Date.now() - elapseTime;
}

function handleStop(){
  setIsRunning(false);
}

function handleReset(){
  setElapseTime(0);
  setIsRunning(false);
}

function formatTime(){

  let hours = Math.floor(elapseTime / (1000 *60 * 60));
  let minutes = Math.floor(elapseTime / (1000 *60) %  60);
  let seconds = Math.floor(elapseTime / (1000) %  60);
  let milliseconds = Math.floor((elapseTime % 1000) /10);
  return `${minutes}:${seconds}:${milliseconds}`;
}

  return(
    <div className="stop-watch-container">
      <div className="display-time">
          {formatTime()}
      </div>
      <div className="controls">
        <button className="start-btn" onClick={handleStart}>START</button>
        <button className="stop-btn" onClick={handleStop}>STOP</button>
        <button className="reset-btn" onClick={handleReset}>RESET</button>
      </div>
    </div>
  );
}

export default StopWatch