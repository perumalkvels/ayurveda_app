import React,{useEffect, useState, useRef} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Services = () => {

  const [count,setCount] = useState(0);
  const [clearCount, setClearCount] = useState([]);


  const [inputValue, setInputValue] = useState("");
  const [clear, setClear] = useState(false);
  const previousInputValue = useRef("");


  const button = useRef();

  const focusInput = (text) => {
    let word = text;
    if(word){
      button.current.style.backgroundColor = "blue";
    }
    else{
      button.current.style.backgroundColor = "red";
    }
   
  };

  useEffect(() => {
    if(clear) {
      previousInputValue.current = inputValue;
      setInputValue("");
      setClear(false);
    }
  }, [clear]);

  const addClearCount = () => {
    setClearCount([...clearCount ,count]);
    console.log(clearCount);
  }

  useEffect(()=>{
    console.log('count',count);
    setCount(0);
  },[clearCount])

  return (<>
   <div className='bg-dark text-light p-3 text-center'>Services</div>
      <br />
      <Button variant="contained" color="secondary" onClick={()=>setCount(count+1)}>+</Button>
      <TextField label="Filled success" variant="filled" color="success" focused value={count}/>
      <Button variant="contained" color="secondary" onClick={()=>setCount(count-1)}>-</Button>
      " "
      <Button variant="contained" color="secondary" onClick={addClearCount}> Clear Count</Button>
      <div>
        {clearCount.length && clearCount.map((val,index)=> <li>{ val}</li>)}
      </div>
      <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={()=>setClear(true)}> Clear</Button>
      <h2>Current Value: {inputValue}</h2>
      <h2>Previous Value: {previousInputValue.current}</h2>

      <input type="text" onChange={(e) => focusInput(e.target.value)}/>
      <button 
        ref={button} 
        style={{backgroundColor: "red" }}
      >Focus Input</button>
    </>

  </>
   
  )
}

export default Services