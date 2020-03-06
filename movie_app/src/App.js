import React from 'react';
import axios from "axios";
import Movie from "./Movie"
import "./App.css"

class App extends React.Component {
    state = {
        isLoading: true,
        movies: [] // state에 뭔가를 추가하는 것은 자유다! 사실 default는 필요 없음.
    };

    getMovies = async () => { 
        // 비동기: async - await
        // 함수를 async로 선언하지 않으면 await은 사용 불가능
        
        //const movies = await axios.get("https://yts-proxy.now.sh/list_movies.json"); 
        //console.log(movies.data.data.movies); // not ES6
        
        const {data: {data: {movies}}} = await axios.get(
            "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"); 
            // api 문서와 비교해볼 것. 이렇게 쓰는 거다. https://yts.lt/api#list_movies
        //console.log(movies);  
        this.setState({ movies, isLoading: false }); 
        // this.setState({ movies:movies }); not ES 6    setState of movies: movies from axios
    }

    componentDidMount() {
        this.getMovies();
        // axios: fetch를 감싼 얇은 레이어
        // 비동기니까 기다려야 함.
        
        //여기서 data를 fetch한다.
        //fetch가 끝나면 렌더링을 한다.
    }

    render(){
        //return <div>{isLoading ? "loading" : "We are ready"} </div>; // 이건 작동 안 함
        //return <div>{this.state.isLoading ? "loading" : "We are ready"} </div>; // 이래야 됨
        const { isLoading, movies } = this.state; // ES6 feature, destructuring.
        return <section className="container">
                 {isLoading 
              ? (<div className="loader"> 
                   <span className="loader__text">Loading...</span> 
                 </div>)
              : (<div className="movies">
                  {movies.map(movie => (
                      <Movie
                       key={movie.id} id={movie.id} year={movie.year}
                       title={movie.title} 
                       summary={movie.summary}
                       poster={movie.medium_cover_image}
                       genres={movie.genres}
                     />
                   ))}
                 </div>
              )}
        </section>
    }
}

/*
class App extends React.Component {
    constructor(props){
        super(props);
        console.log('ctor');
    }
    state = { // state is object, DO NOT CHANGE STATE DIRECTLY!!! it wouldn't work!
        count: 0
    };
    add = () => {
        //this.state.count = 1;// 이렇게 하면 react가 render를 다시 호출하지 않는다.
        //this.setState({count: this.count + 1})
        this.setState({count: this.state.count + 1}) // 이거 사실 별로 안 좋아.
        this.setState(current => ({count: current.count + 1})); 
        //위 코드를 이용하면react는 외부 상태에 의존할 필요가 없다.
        // best practice!
        //console.log('add')
    };
    minus = () => {
        //this.setState({count: this.state.count - 1})
        this.setState(current => ({count: current.count - 1})); 
        //console.log('minus')
    };
    render(){ // react가 자동으로 render를 실행함.
        console.log('rendering');
        return <div> 
            <h1> The number is: {this.state.count} </h1>
            <button onClick={this.add}> Add </button>  
            <button onClick={this.minus}> minus </button>
        </div> 
    }
    componentDidMount() {
        console.log('rendered!');
    }

    componentDidUpdate(){
        console.log('I just updated!');
    }

    componentWillUmount() {
        // component가 언마운트될 때 실행된다.
        console.log('bye bye!');
    }
    // react는 자동적으로 주어진 onClick이 있다.
    // react는 virtual dom을 이용해서, 정확히 변한 곳만을 변경하여 
    // 다시 render를 호출한다. 그래서 빠르다.
    //
    // setState를 호출할 때마다, react는 새로운 state와 함께 render를 호출한다.

    // Life cycle (method) - react가 컴포넌트를 생성하고 없애는 방법
    // render 전 후에 호출되는 메서드들이 있음.
    // https://reactjs.org/docs/react-component.html#the-component-lifecycle
    //
    //Mounting - 컨포넌트의 시작,
    // constructor()는 js의 것. component가 screen에 표시될 때 ctor가 호출 됨.
    //
    // constructor()
    // static getDerivedStateFromProps()
    // render()
    // componentDidMount()
    //
    //Updating - 업데이트, state를 바꾸는 것.
    // static getDerivedStateFromProps()
    // shouldComponentUpdate()
    // render()
    // getSnapshotBeforeUpdate()
    // componentDidUpdate()
    //
    //Unmounting - 컴포넌트 사망. 페이지를 바꿀 때.. state를 이용하여 교체하거나..
}
*/

export default App;
