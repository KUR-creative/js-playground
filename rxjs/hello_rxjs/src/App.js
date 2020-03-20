import React, {useState, useEffect} from 'react';
//import logo from './logo.svg';
//import './App.css';
import { of } from 'rxjs';

const source = ['Adam', 'Brian', 'Christine'];
const names$ = of(source);

function List(props) {
  return (
    <ul>
      {(props.items)
       ? props.items.map((x,i) => <li key={i}>{x}</li>)
       : <></>}
    </ul>
  );
}

function App() {
  const [names, setNames] = useState();

  useEffect(() => {
    const subscription = names$.subscribe(setNames);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      <h1>RxJS with React</h1>
      <List items={names} />
    </div>
  );
}

export default App;
