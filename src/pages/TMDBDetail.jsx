import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const TMDBDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true)
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
      const data = await response.json()
      setMovie(data)
      setLoading(false)
    }
    fetchMovie()
  }, [id])

  if (loading) return (
    <div className='bg-[#0f0f0f] min-h-screen flex items-center justify-center'>
      <p className='text-white text-xl'>Loading...</p>
    </div>
  )

  return (
    <div className='bg-[#0f0f0f] min-h-screen text-white'>
      <Navbar />
      <div className='max-w-5xl mx-auto px-6 py-10'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white px-4 py-2 rounded-full transition duration-300 mb-6 w-fit'
        >
          ← Back
        </button>

        <div className='flex flex-col md:flex-row gap-8'>
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/300x450?text=No+Image"}
            alt={movie.title}
            className='w-full md:w-72 rounded-xl object-cover'
          />

          <div className='flex flex-col gap-3'>
            <h1 className='text-4xl font-bold'>{movie.title}</h1>
            <p className='text-gray-400'>{movie.release_date?.split('-')[0]} • {movie.genres?.map(g => g.name).join(', ')} • {movie.runtime} min</p>
            <div className='flex items-center gap-2'>
              <span className='text-yellow-400 text-lg'>⭐</span>
              <span className='text-white font-semibold'>{movie.vote_average?.toFixed(1)}/10</span>
            </div>
            <p className='text-gray-300 leading-relaxed'>{movie.overview}</p>
            <p className='text-gray-400'><span className='text-white font-semibold'>Status:</span> {movie.status}</p>
            <p className='text-gray-400'><span className='text-white font-semibold'>Language:</span> {movie.original_language?.toUpperCase()}</p>
            <p className='text-gray-400'><span className='text-white font-semibold'>Budget:</span> {movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TMDBDetail