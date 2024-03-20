import React,{useEffect, useState} from 'react'
import Pagination from './Pagination'
// import Tables from './Tables';
import up from '../up.png'
import down from '../down.png'

const Favourites = () => {
  let genreids={
    28:'Action',
    12:'Adventure',
    16:'Animation',
    35:'Comedy',
    80:'Crime',
    99:'Documentary',
    18:'Drama',
    10751:'Family',
    14:'Fantasy',
    36:'History',
    27:'Horror',
    10402:'Music',
    9648:'Mystery',
    10749:'Romance',
    878:'Sci-Fi',
    10770:'Tv',
    53:'Thriller',
    10752:'War',
    37:'Western',
  };
  const [curGenre,setCurGenre]=useState(true);
  const [Favourites,setFavourites]=useState([]);

  const [genres,setGenres]=useState([])

  // for getting movies
  useEffect(()=>{
    let oldFav=localStorage.getItem("IMDB");
    oldFav=JSON.parse(oldFav);
    setFavourites([...oldFav])
  },[])

  //for genres get -> to build those blue/grey buttons
useEffect(()=>{
  let temp=Favourites.map((movie)=>genreids[movie.genre_ids[0]])
  console.log(temp);
  setGenres([...temp])
},[Favourites])

  let remove = (movie) => {
    let newArray = Favourites.filter((m) => m.id !== movie.id);
    // console.log(newArray)
    setFavourites([...newArray]);
    localStorage.setItem("IMDB",JSON.stringify(newArray))
  };
  return (
    <>
    <div className='mt-4 px-2 flex justify-center flex-wrap space-x-2'>
    <button className=
    { curGenre===true?'m-2 text-xl p-2 bg-blue-500 text-white rounded-xl font-bold' : 'm-2 text-xl p-2 bg-gray-400 hover:bg-blue-500 text-white rounded-xl font-bold'
    }>All Genres</button>
    <button className={ curGenre===true?'m-2 text-xl p-2 bg-blue-500 text-white rounded-xl font-bold' : 'm-2 text-xl p-2 bg-gray-400 hover:bg-blue-500 text-white rounded-xl font-bold'
    }>Action</button>
    </div>
    <div className='text-center'>
      <input type='text' placeholder='Search' className='border border-2 text-center p-1 m-2'/>
      <input type='number' placeholder='Rows' className='border border-2 text-center p-1 m-2'/>
    </div>

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    Name
                </th>
                <th scope="col" className="px-6 py-3 flex">
                    <img src={up} className='h-5 w-5 mx-2'/>
                    Rating
                    <img src={down} className='h-5 w-5 mx-2'/>
                </th>
                <th scope="col" className="px-6 py-3">
                    <img src={up} className='h-5 w-5 mx-2'/>
                    Popularity
                    <img src={down} className='h-5 w-5 mx-2'/>
                </th>
                <th scope="col" className="px-6 py-3">
                    Genre
                </th>
                <th scope="col" className="px-6 py-3">
                    Remove
                </th>
            </tr>
        </thead>
        <tbody>
          {
            Favourites.map((movie)=>(
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                  <img src={`https://image.tmdb.org/t/p/w200/${movie.backdrop_path}}`}/>  {movie.original_title}
                </th>
                <td className="px-6 py-4">
                    {movie.vote_average}
                </td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    {movie.popularity}
                </td>
                <td className="px-6 py-4">
                    
                </td>
                <td className="px-6 py-4">
                    <button onClick={()=>remove(movie)}>Delete</button>
                </td>
            </tr>
            ))
          }
            
           
        </tbody>
    </table>
</div>

    <div className='mt-4'>
        <Pagination/>
    </div>
    </>
  )
}

export default Favourites