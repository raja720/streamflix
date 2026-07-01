import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovieById } from '../services/api'
import Navbar from '../components/Navbar'

const MovieDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true)
            const data = await getMovieById(id)
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
            <Navbar onSearch={(query) => navigate(`/?search=${query}`)} />
            <div className='max-w-5xl mx-auto px-6 py-10'>

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className='flex items-center gap-2 bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white px-4 py-2 rounded-full transition duration-300 mb-6 w-fit'
                >
                    ← Back
                </button>

                <div className='flex flex-col md:flex-row gap-8'>
                    {/* Poster */}
                    <img
                        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
                        alt={movie.Title}
                        className='w-full md:w-72 rounded-xl object-cover'
                    />

                    {/* Details */}
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-4xl font-bold'>{movie.Title}</h1>
                        <p className='text-gray-400'>{movie.Year} • {movie.Genre} • {movie.Runtime}</p>
                        <div className='flex items-center gap-2'>
                            <span className='text-yellow-400 text-lg'>⭐</span>
                            <span className='text-white font-semibold'>{movie.imdbRating}/10</span>
                        </div>
                        <p className='text-gray-300 leading-relaxed'>{movie.Plot}</p>
                        <p className='text-gray-400'><span className='text-white font-semibold'>Director:</span> {movie.Director}</p>
                        <p className='text-gray-400'><span className='text-white font-semibold'>Actors:</span> {movie.Actors}</p>
                        <p className='text-gray-400'><span className='text-white font-semibold'>Language:</span> {movie.Language}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail