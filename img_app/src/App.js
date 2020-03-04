import React, { useState } from 'react';
import logo from './logo.svg';

function App() {
    const [str, setStr] = useState("0");

    const atest = async e => {
        const f = e.target.files[0]
        const text = await f.text()
	setStr(text)
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
