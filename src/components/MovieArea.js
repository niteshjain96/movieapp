import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Oval} from 'react-loader-spinner'
import Pagination from './Pagination';

const MovieArea = () => {

  const [movies,setMovies]=useState([])

  const [pageNumber,setPage]=useState(1);

  const [hover,setHover]=useState('');
  const [favourites,setFavourites]=useState([])
  
  function goAhead(){
    setPage(pageNumber+1);
  }

  function goPrevious(){
    if(pageNumber>1){

      setPage(pageNumber-1);
    }
  }

  useEffect(function(){

    axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=26679952e503d6dfde7f2e19461c4895&page=${pageNumber}`).then((res)=>
  // console.table(res.data.results)
  {setMovies(res.data.results)
    let oldFav=localStorage.getItem("IMDB");
    oldFav = oldFav ? JSON.parse(oldFav) : [];
    setFavourites([...oldFav])

  }
  )
  },[pageNumber])

  let add=(movie)=>{
    let newArray=[...favourites,movie]
    // console.log(newArray)
    setFavourites([...newArray])
    localStorage.setItem("IMDB",JSON.stringify(newArray))
  }

  let remove = (movie) => {
    let newArray = favourites.filter((m) => m.id !== movie.id);
    // console.log(newArray)
    setFavourites([...newArray]);
    localStorage.setItem("IMDB",JSON.stringify(newArray))
  };
  return (
    <>
    {/* 
    First div for heading , second div for card area
    */}
    <div className='mb-8 '>
      <div className='mt-8 text-2xl font-bold text-center'>Trending Movies</div>
      {
        movies.length===0 ?  
        <div className='flex justify-center'><Oval height='100' color='grey' ariaLabel='loading'/></div>
        
        :
        <div className='flex m-10 flex-wrap justify-center'>
          {
            movies.map((movie)=>(
              <div key={movie.id} style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w300/${movie.backdrop_path})`,
              }} className='h-[25vh] w-[150px] md:h-[30vh] md:w-[250px] bg-center bg-cover rounded-xl flex items-end m-4 hover:scale-110 ease-out duration-300 relative' onMouseEnter={()=>setHover(movie.id)} onMouseLeave={()=>setHover('')}>
                {
                  hover===movie.id && 
                  <>
                  {
                    !favourites.find((m) => m.id===movie.id) ? <div className='absolute top-5 right-2 p-2 bg-gray-800 rounded-xl text-xl cursor-pointer' onClick={()=>add(movie)}>😍</div>:
                    
                    <div className='absolute top-5 right-12 p-2 bg-gray-800 rounded-xl text-xl cursor-pointer' onClick={()=>remove(movie)}>❌</div>
                    
                  }
                  </>
                }
              
              <div className='bg-gray-900 w-full text-white py-2 text-center rounded-b-xl text-xl font-bold '>{movie.title}</div>
            </div>
            ))
          }
        

      </div>
      }
      
    </div>
    <Pagination pageNumber={pageNumber} goPrevious={goPrevious} goAhead={goAhead}/>
    </>
  )
}

export default MovieArea