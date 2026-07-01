import { useState, useEffect } from 'react'
import { Routes, Route, useSearchParams } from 'react-router-dom'
import { searchMovies, getPopularMovies } from './services/api'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MovieCard from './components/MovieCard'
import SkeletonCard from './components/SkeletonCard'
import MovieDetail from './pages/MovieDetail'
import TMDBDetail from './pages/TMDBDetail'

function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [currentQuery, setCurrentQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchParams] = useSearchParams()

  const fetchPopular = async (page = 1) => {
    setLoading(true)
    setIsSearching(false)
    const data = await getPopularMovies(page)
    setMovies(data.results.map(m => ({
      imdbID: m.id,
      Title: m.title,
      Year: m.release_date?.split('-')[0],
      Poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
      Type: 'movie',
      source: 'tmdb'
    })))
    setTotalPages(data.total_pages > 10 ? 10 : data.total_pages)
    setCurrentPage(page)
    setLoading(false)
  }

  const fetchSearch = async (query, page = 1) => {
    setLoading(true)
    setIsSearching(true)
    setCurrentQuery(query)
    const data = await searchMovies(query, page)
    setMovies(data.Search || [])
    setTotalPages(Math.ceil(parseInt(data.totalResults) / 10) || 0)
    setCurrentPage(page)
    setLoading(false)
  }

  useEffect(() => {
    const query = searchParams.get('search')
    if (query) {
      fetchSearch(query, 1)
    } else {
      fetchPopular(1)
    }
  }, [searchParams])

  return (
    <Routes>
      <Route path='/tmdb/:id' element={<TMDBDetail />} />
      <Route path='/' element={
        <div className='bg-[#0f0f0f] min-h-screen'>
          <Navbar onSearch={(q) => fetchSearch(q, 1)} />
          <Hero />
          <h2 className='text-white text-2xl font-bold px-10 mt-8 mb-4'>
            {isSearching ? `Results for "${currentQuery}"` : 'Popular Movies'}
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 md:px-10 pb-10'>
            {loading
              ? Array(10).fill(0).map((_, i) => <SkeletonCard key={i} />)
              : movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))
            }
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className='flex justify-center items-center gap-2 pb-10'>
              <button
                onClick={() => isSearching ? fetchSearch(currentQuery, currentPage - 1) : fetchPopular(currentPage - 1)}
                disabled={currentPage === 1}
                className='px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-40 hover:bg-red-600 transition'
              >
                ←
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1
                return (
                  <button
                    key={page}
                    onClick={() => isSearching ? fetchSearch(currentQuery, page) : fetchPopular(page)}
                    className={`px-4 py-2 rounded transition ${currentPage === page ? 'bg-red-600 text-white' : 'bg-gray-800 text-white hover:bg-gray-600'}`}
                  >
                    {page}
                  </button>
                )
              })}
              <button
                onClick={() => isSearching ? fetchSearch(currentQuery, currentPage + 1) : fetchPopular(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-40 hover:bg-red-600 transition'
              >
                →
              </button>
            </div>
          )}
        </div>
      } />
      <Route path='/movie/:id' element={<MovieDetail />} />
    </Routes>
  )
}

export default App