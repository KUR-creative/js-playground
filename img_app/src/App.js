import React, { useState } from 'react';
import logo from './logo.svg';

function App() {
    const [name, setName] = useState("0");

    //const atest = async e => {
    const atest = e => {
        const f = e.target.files[0]
        
        //const text = await f.text() // It doesn't work in chrome version 72..
        // https://developer.mozilla.org/en-US/docs/Web/API/Blob/text
        
        const reader = new FileReader();
        // https://developer.mozilla.org/ko/docs/Web/API/FileReader
        reader.addEventListener("load", e => {
            setName(f.name)
        })
        reader.readAsText(f)
    }

    return (
        <div className="App">
          <div>
            <input type="file" id="input" onChange={atest}/>
          </div>
          <h1>{name}</h1>
        </div>
    );
}

export default App;
