import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {

  async function deleteMovieHandler (){
    const response=await fetch(`https://react-fetch-apicalls-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${props.id}.json`,{
    method: 'DELETE'})

    if(!response.ok){
      console.log('Something Went Wrong')
    }
    console.log('deleted')
  }

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={()=>{deleteMovieHandler(props.id)}}>Delete Movie</button>
    </li>
  );
};

export default Movie;
