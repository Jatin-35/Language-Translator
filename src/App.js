import {useState , useEffect} from 'react';
import './App.css';
import axios from "axios"

  // const axios = require('axios').default;

function App() {

  const [options,setOptions] = useState([])
  const [to ,setTO] = useState("en");
  const [from,setFrom] = useState("en");
  const [input,setInput] = useState("");
  const [output,setoutput] = useState("");

  const translate = () => {


    axios.post('https://api.mymemory.translated.net/get?q='+input+'&langpair='+from+'|'+to)
    .then(res=>{
      console.log(res.data)
      setoutput(res.data.responseData.translatedText
        )
    })
  };

  // curl -X 'GET' \'https://libretranslate.com/languages' \-H 'accept: application/json'
 

  useEffect(()=>{
    try{
    axios.get('https://libretranslate.de/languages' ,
     {headers:{'accept' : 'application/json'}}).then(res=>{
      console.log(res.data);
      setOptions(res.data);
     })
    }catch(e){
      console.log(e)

    }

  },1)//dependency array  

  return (
    <>
    <div className="App">
        <h1>Language Translater</h1>
         <select onChange={e => setFrom(e.target.value)}>
          {options.map(opt=> <option key={opt.code} value ={opt.code}>{opt.name}</option>)}
         </select>
        
         <select onChange={e => setTO(e.target.value)}>
         {options.map(opt=> <option key={opt.code} value ={opt.code}>{opt.name}</option>)}
         </select>

         <div>
            <textarea cols="50" rows="8" onInput={(e)=>setInput(e.target.value)}></textarea>
         </div>
         <div>
            <button onClick={e=>translate()}>Translate</button>
         </div>
         <div>
            <textarea cols="50" rows="8" value={output}></textarea>
         </div>

         
    </div>
    </>
  );
}

export default App;
