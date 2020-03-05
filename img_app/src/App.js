import React, { useState } from 'react';
import logo from './logo.svg';

function App() {
    const [name, setName] = useState("");
    const [img, setImg] = useState("");

    //const atest = async e => {
    const atest = e => {
        const f = e.target.files[0]
        
        //const text = await f.text() // It doesn't work in chrome version 72..
        // https://developer.mozilla.org/en-US/docs/Web/API/Blob/text
        
        const reader = new FileReader();
        // https://developer.mozilla.org/ko/docs/Web/API/FileReader
        reader.addEventListener("load", e => {
            setName(f.name)
            setImg(e.target.result)
        })
        reader.readAsDataURL(f)
    }

    return (
        <div className="App">
          <div>
            <input type="file" id="input" onChange={atest}/>
          </div>
          <h1>{name}</h1>
          <img src={img} alt="not loaded"/>
        </div>
    );
}

export default App;
