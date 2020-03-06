import React from 'react';
import PropTypes from "prop-types";
//import Potato from './Potato';

function Food({name, picture, rating}){ // <- ES6에서는 아마 근로저처럼 바인딩을 지원하는 듯?
    // 이런 함수를 function component 라고 한다.
    // 컴포넌트 이름은 반드시 첫 문자가 대문자여야 함.
    // key는 안 넣는다. key는 prop이 아냐! react에서 내부적으로 사용한다.
    //console.log(props)
    //console.log(fav)
    return <div>
      <h2>I like {name}</h2>
      <h3>{rating} / 6.0</h3>
      <img src={picture} />
    </div>;
}

Food.propTypes = { // <- 이거 반드시 propTypes로 이름 붙여야 함.
  // description I want info
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
}

const memes = [
    {
        id:1,
        name:"man", 
        image:"https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwj_xpmYy4DnAhUP7GEKHSrAD-0QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.freecodecamp.org%2Fnews%2Flearn-react-by-building-a-meme-generator%2F&psig=AOvVaw0Xnp6611wzOJyOaPz384BC&ust=1579005278248793",
        rating:5
    },
    {
        id:2,
        name:"baby", 
        image:"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjkie6uy4DnAhXTZt4KHViCAVgQjRx6BAgBEAQ&url=http%3A%2F%2Fblog.easysafetyschool.com%2F2012%2F03%2Fhilarious-osha-training-memes.html%3Fm%3D0&psig=AOvVaw0Xnp6611wzOJyOaPz384BC&ust=1579005278248793"
        ,rating:5.1 
    },
    {
        id:3,
        name:"ynguy", 
        image:"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjsrvS-y4DnAhVZ_GEKHUhODDAQjRx6BAgBEAQ&url=https%3A%2F%2Fme.me%2Fi%2Fplaying-minecraft-watching-pewds-play-minecraft-nah-yeah-ab7bb2b06613488fa06848a17e0c0db4&psig=AOvVaw0Xnp6611wzOJyOaPz384BC&ust=1579005278248793"
        ,rating:5.2
    },
]

function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      <h1>중괄호 없이 쓰면 텍스트다. 중괄호 안에 쓰면 javascript 코드다.</h1>
      {memes.map(dish => <Food key={dish.id} name={dish.name} img={dish.image}
          rating={dish.rating}/>)}
    </div>
  );
}

export default App;
//<Food fav={{1:[1,2,3,{4:5,6:7}], 8:9}} /> 
