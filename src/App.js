import React, { useState,useEffect, useCallback } from 'react';
import AddMovies from './components/AddMovies'

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const[movies,setMovies]=useState([]);
  const[isLoading,setIsLoading]=useState(false);
  const [error, setError]=useState(null);
  const [cancel, setCancel]=useState(null);


const fetchMovieHandler=useCallback(async()=>{
    setIsLoading(true);
    setError(null);
    try{
    const response=await fetch('https://react-fetch-apicalls-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json')

    if(!response.ok){
      throw new Error('Something went wrong....Retrying')
    }
  const data=await response.json();

const loadedMovies=[];

for (const key in data) {
  loadedMovies.push({
    id:key,
    title:data[key].title,
    openingText:data[key].openingText,
    releaseDate:data[key].releaseDate,
  })
}
 
setMovies(loadedMovies);  
setIsLoading(false);
  }catch(error) {
setError(error.message);
const cleanInterval=setInterval(async()=>{
  await fetch("https://react-fetch-apicalls-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json")
},5000)
setCancel(cleanInterval)
} 

setIsLoading(false);
},[])

useEffect(()=>{
  fetchMovieHandler();
},[fetchMovieHandler])

async function addMovieHandler(movie) {
  const response= await fetch('https://react-fetch-apicalls-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json',{
    method: 'POST',
    body: JSON.stringify(movie),
    headers:{
      'Content-Type':'application/json'
    }
  })
  const data=await response.json();
  console.log(data);
}



const cancelRetryingHandler=()=>{
  console.log('cancelled')
  clearInterval(cancel);
}
let content=<p>Found no movies.</p>

if(movies.length>0){
  content=<MoviesList movies={movies}/>
}

if(error){
  content=<p>{error}</p>
}

if(isLoading){
  content=<p>Loading...</p>
}

  
  return (
    <React.Fragment>
      <section>
        <AddMovies onAddMovie={addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {error && <button onClick={cancelRetryingHandler}>Cancel</button>}
      </section>
    </React.Fragment>
  );
}

export default App;
