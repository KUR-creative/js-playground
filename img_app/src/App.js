import React, { useState } from 'react';
import logo from './logo.svg';

function App() {
    const [str, setStr] = useState("0");

    //const atest = async e => {
    const atest = e => {
        const f = e.target.files[0]
        console.log(f)
        console.log(f.text)
        
        //const text = await f.text() // It doesn't work in chrome version 72..
        // https://developer.mozilla.org/en-US/docs/Web/API/Blob/text
        
        const reader = new FileReader();
        // https://developer.mozilla.org/ko/docs/Web/API/FileReader
        reader.addEventListener("load", e => {
            setStr(e.target.result)
        })
        reader.readAsText(f)
    }

    return (
        <div className="App">
          <div>
            <input type="file" id="input" onChange={atest}/>
          </div>
          <h1>{str}</h1>
        </div>
    );
}

export default App;
