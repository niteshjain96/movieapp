import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import up from '../up.png';
import down from '../down.png';

const Favourites = () => {
  let genreids = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Sci-Fi',
    10770: 'Tv',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };
  const [curGenre, setCurGenre] = useState('All Genres');
  const [Favourites, setFavourites] = useState([]);
  const [genres, setGenres] = useState([]);
  const [rating, setRating] = useState(0);
  const [popularity, setPopularity] = useState(0);
  const [search,setSearch]=useState('');
  const [rows,setRows]=useState(5);
  const [curPage,setCurPage]=useState(1);
  // for getting movies
  useEffect(() => {
    let oldFav = localStorage.getItem('IMDB');
    oldFav = JSON.parse(oldFav);
    setFavourites([...oldFav]);
  }, []);

  // for genres get -> to build those blue/grey buttons
  useEffect(() => {
    let temp = Favourites.map((movie) => genreids[movie.genre_ids[0]]);
    temp = Array.from(new Set(temp)); // Convert to set to remove duplicates
    setGenres(['All Genres', ...temp]);
  }, [Favourites]);

  let remove = (movie) => {
    let newArray = Favourites.filter((m) => m.id !== movie.id);
    // console.log(newArray)
    setFavourites([...newArray]);
    localStorage.setItem('IMDB', JSON.stringify(newArray));
  };

  let filteredMovies = [];
  filteredMovies =
    curGenre === 'All Genres'
      ? Favourites
      : Favourites.filter((movie) => genreids[movie.genre_ids[0]] === curGenre);

  // sorting
  if (rating === 1) {
    filteredMovies = filteredMovies.sort(function (objA, objB) {
      return objA.vote_average - objB.vote_average;
    });
  } else if (rating === -1) {
    filteredMovies = filteredMovies.sort(function (objA, objB) {
      return objB.vote_average - objA.vote_average;
    });
  }
  if (popularity === 1) {
    filteredMovies = filteredMovies.sort(function (objA, objB) {
      return objA.popularity - objB.popularity;
    });
  } else if (popularity === -1) {
    filteredMovies = filteredMovies.sort(function (objA, objB) {
      return objB.popularity - objA.popularity;
    });
  }

  // searching
  filteredMovies=filteredMovies.filter((movie)=>
    movie.title.toLowerCase().includes(search.toLowerCase())
  )

  // pagination
  let maxPage=Math.ceil(filteredMovies.length/rows);
  let si=(curPage-1)*rows;
  let ei=Number(si)+Number(rows);
  filteredMovies=filteredMovies.slice(si,ei);

  let goPrevious=()=>{
    if(curPage>1){
      setCurPage(curPage-1);
    }
  }

  let goAhead=()=>{
    if(curPage<maxPage){
      setCurPage(curPage+1);
    }
  }

  return (
    <>
      <div className='mt-4 px-2 flex justify-center flex-wrap space-x-2'>
        {genres.map((genre) => (
          <button
            className={
              curGenre === genre
                ? 'm-2 text-xl p-2 bg-blue-500 text-white rounded-xl font-bold'
                : 'm-2 text-xl p-2 bg-gray-400 hover:bg-blue-500 text-white rounded-xl font-bold'
            }
            onClick={() => {setCurGenre(genre)
            
            setCurPage(1)}}
            key={genre}
          >
            {genre}
          </button>
        ))}
      </div>
      <div className='text-center'>
        <input type='text' placeholder='Search' className='border border-2 text-center p-1 m-2' onChange={(e)=>setSearch(e.target.value)}/>
        <input type='number' placeholder='Rows' className='border border-2 text-center p-1 m-2' value={rows} onChange={(e)=>setRows(e.target.value)} />
      </div>

      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3 bg-gray-50 dark:bg-gray-800'>
                Name
              </th>
              <th scope='col' className='px-6 py-3'>
                <img src={up} onClick={() => {
                  setRating(-1)
                  setPopularity(0)
                }
                } className='cursor-pointer h-5 w-5 mx-2' alt='upvote' />
                Rating
                <img src={down} onClick={() => {
                  setRating(1)
                  setPopularity(0)
                }} className='cursor-pointer h-5 w-5 mx-2' alt='downvote' />
              </th>
              <th scope='col' className='px-6 py-3'>
                <img src={up} onClick={() => {
                  setPopularity(-1)
                   setRating(0)}} className='cursor-pointer h-5 w-5 mx-2' alt='upvote' />
                Popularity
                <img src={down} onClick={() => {
                  setPopularity(1)
                  setRating(0)}} className='cursor-pointer h-5 w-5 mx-2' alt='downvote' />
              </th>
              <th scope='col' className='px-6 py-3'>
                Genre
              </th>
              <th scope='col' className='px-6 py-3'>
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movie) => (
              <tr className='border-b border-gray-200 dark:border-gray-700' key={movie.id}>
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
                >
                  <img src={`https://image.tmdb.org/t/p/w200/${movie.backdrop_path}`} alt='movie poster' />
                  {movie.original_title}
                </th>
                <td className='px-6 py-4'>{movie.vote_average}</td>
                <td className='px-6 py-4 bg-gray-50 dark:bg-gray-800'>{movie.popularity}</td>
                <td className='px-6 py-4'>{genreids[movie.genre_ids[0]]}</td>
                <td className='px-6 py-4'>
                  <button onClick={() => remove(movie)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='mt-4'>
        <Pagination pageNumber={curPage} goPrevious={goPrevious} goAhead={goAhead}/>
      </div>
    </>
  );
};
export default Favourites;
