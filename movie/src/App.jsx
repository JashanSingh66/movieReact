import { useEffect, useState } from 'react';
import Search from './components/search';
import MovieCard from './components/movieCard';

const App = () => {
  const [searchItem, setsearchItem] = useState('');
  const [movie, setmovie] = useState([]);
  const [loading, setloading] = useState(false);

  const API_BASE_URL = 'https://api.themoviedb.org/3';
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const fetchMovies = async (query=' ') => {
    setloading(true);
    try {
      const endpoint = query? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :
      `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }


      const data = await response.json();

      setmovie(data.results || []);


    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchMovies(searchItem);
  }, [searchItem]);

  return (
    <main>
      <div className='pattern' />
      <center>
      <div className='pattern '>
        <img src='/logo.png' alt='logo'/>
        <h2 className='text-gradient mt-[10px]'>Movie Hub</h2>
      </div>
      </center>
      <div className='wrapper'>
        <header>
          <img src="/hero.png" alt="Hero Banner" />
          <h1>
            Find <span className='text-gradient'>movies</span> You'll Enjoy without the hassle
          </h1>
          <Search searchItem={searchItem} setsearchItem={setsearchItem} />
        </header>

        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>
          {loading ? (
            <p className='text-white'>Loading...</p>
          ) : (
            <ul>
              {movie.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;