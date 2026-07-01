import React, { useState, useEffect } from 'react'
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react'
import { getTrendingMovies } from '../services/api'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const [movies, setMovies] = useState([])
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetch = async () => {
      const data = await getTrendingMovies()
      setMovies(data)
    }
    fetch()
  }, [])

  useEffect(() => {
    if (movies.length === 0) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % movies.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [movies])

  if (movies.length === 0) return (
    <div className='h-100 bg-gray-900 animate-pulse' />
  )

  const movie = movies[current]

  return (
    <div
      className='relative h-100 md:h-125 flex flex-col justify-end px-4 md:px-10 pb-10 text-white bg-cover bg-center transition-all duration-700 cursor-pointer'
      onClick={() => navigate(`/tmdb/${movie.id}`)}
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.2)), linear-gradient(to top, rgba(0,0,0,0.9), transparent), url('${movie.Poster}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top'
      }}
    >
      <p className='text-red-500 font-semibold mb-2 text-sm md:text-base'>Trending Now</p>
      <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold mb-2'>{movie.Title}</h1>
      <p className='text-gray-300 text-sm md:text-base max-w-lg mb-2'>{movie.Year} • ⭐ {movie.imdbRating}</p>
      <p className='text-gray-400 text-sm max-w-lg mb-4 hidden md:block'>{movie.Plot}</p>

      <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4'>
        <button className='flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 md:px-6 py-2 md:py-3 rounded font-semibold transition text-sm md:text-base'>
          <Play size={18} fill="white" />
          Play Now
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); navigate(`/tmdb/${movie.id}`) }}
          className='flex items-center justify-center gap-2 bg-gray-700/80 hover:bg-gray-600 px-4 md:px-6 py-2 md:py-3 rounded font-semibold transition text-sm md:text-base'>
          <Info size={18} />
          More Info
        </button>
      </div>

      <div className='flex gap-2'>
        {movies.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
            className={`w-2 h-2 rounded-full transition ${i === current ? 'bg-red-600 w-6' : 'bg-gray-500'}`}
          />
        ))}
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); setCurrent(prev => (prev - 1 + movies.length) % movies.length) }}
        className='absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-red-600 p-2 rounded-full transition'
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); setCurrent(prev => (prev + 1) % movies.length) }}
        className='absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-red-600 p-2 rounded-full transition'
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}

export default Hero