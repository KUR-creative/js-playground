import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root')); // <- 이건 component를 쓰는 방법임
//ㄴ 이렇게 js와 html의 조합을 jsx라고 한다(리액트에서만 쓰는 개념)
// jsx 는 말하자면 js 안의 html이다.
//
    //<div id="root"></div> 리액트에서 만든 모든 것을 저기다 집어넣음
//
//component는 html을 반환하는 함수다

//ReactDOM.render(<App /><Potato />, document.getElementById('root')); // <- 이건 component를 쓰는 방법임
// 이건 작동하지 않음. react는 반드시 하나의 컴포넌트로 렌더링되어야하기 때문.
