import React from 'react'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()

  return (
    <div 
      onClick={() => navigate(movie.source === 'tmdb' ? `/tmdb/${movie.imdbID}` : `/movie/${movie.imdbID}`)}
      className='relative bg-gray-900 rounded-xl overflow-hidden cursor-pointer group hover:scale-105 transition duration-300 hover:ring-2 hover:ring-red-600'>

      {/* Poster Image */}
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
        alt={movie.Title}
        className='w-full h-72 object-cover'
      />

      {/* Hover Overlay */}
      <div className='absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-3'>
        <h3 className='text-white font-bold text-sm'>{movie.Title}</h3>
        <p className='text-gray-300 text-xs mt-1'>{movie.Year} • {movie.Type}</p>
        <button className='mt-2 flex items-center gap-1 bg-white/20 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-full transition duration-200 w-fit'>
          <Plus size={14} />
          Watchlist
        </button>
      </div>

      {/* Movie Type Badge */}
      <div className='absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full capitalize'>
        {movie.Type}
      </div>

      {/* Info */}
      <div className='p-3'>
        <h3 className='text-white text-sm font-semibold truncate'>{movie.Title}</h3>
        <p className='text-gray-400 text-xs mt-1'>{movie.Year}</p>
      </div>

    </div>
  )
}

export default MovieCard