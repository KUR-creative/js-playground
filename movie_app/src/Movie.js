import React from 'react';
import PropTypes from "prop-types";
import "./Movie.css"

// 컴포넌트가 스테이트일 필요가 없으면 func 컴포넌트를 써라.

function Movie({year, title, summary, poster, genres}) { // id는 필요 없음
    return (
      <div className="movie">
        <img src={poster} alt={title} title={title}/>
        <div className="movie__data">
          <h3 className="movie__titile">{title}</h3>
          <h5 className="movie__year">{year}</h5>
          <ul className="movie__genres">
            {genres.map((genre,index) => (
              <li key={index} className="genres__genre">{genre}</li>
            ))}
          </ul>
          <p className="movie__summary">{summary.slice(0, 140)} ... </p>
        </div>
      </div>
    );
}

// js의 map(f, li)에서 f는 3개의 인자를 받는다
// f(elem, index, li) 이렇게 3개를 받고, 저 위에서는 index를 key 로 썼다.
// 이건 파이썬과 다른 점이다.

// img 의 alt는 시각 장애자? 를 위한 것.

Movie.propTypes = { // api에서 온 json을 보고 제약사항들을 써나간다.
    id: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Movie; // react를 위해서 반드시 필요

// jsx 는 결국 자바스크립트이기 때문에, 자바스크립트 키워드와 충돌하는 이름은 바꿔야 한다.
// 예를 들어 jsx에서 
// <label for=..> 는 <label htmlFor=...> 로 써야 한다.
//
// 또한 <div class=...> 는 js의 class와 겹치기 때문에
//      <div className=...>로 써야 한다.
//
// string은 array와 비슷하게, slice 쓸 수 있음.
