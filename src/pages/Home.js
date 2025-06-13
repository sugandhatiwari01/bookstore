import { useState } from 'react';
import { Link } from 'react-router-dom';

function Home({ books }) {
  const [search, setSearch] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) ||
                         book.author.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genreFilter ? book.genre === genreFilter : true;
    const matchesAuthor = authorFilter ? book.author === authorFilter : true;
    const matchesRating = ratingFilter ? book.rating >= parseFloat(ratingFilter) : true;
    return matchesSearch && matchesGenre && matchesAuthor && matchesRating;
  });

  const genres = [...new Set(books.map(book => book.genre))];
  const authors = [...new Set(books.map(book => book.author))];

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {search && (
          <ul className="bg-white border border-gray-300 rounded-md max-h-40 overflow-y-auto mt-1">
            {filteredBooks.slice(0, 5).map(book => (
              <li key={book.id} className="p-3 hover:bg-gray-100">
                <Link to={`/book/${book.id}`}>{book.title} by {book.author}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-5">
        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="p-3 border border-gray-300 rounded-md"
        >
          <option value="">All Genres</option>
          {genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
        </select>
        <select
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
          className="p-3 border border-gray-300 rounded-md"
        >
          <option value="">All Authors</option>
          {authors.map(author => <option key={author} value={author}>{author}</option>)}
        </select>
        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="p-3 border border-gray-300 rounded-md"
        >
          <option value="">All Ratings</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
        </select>
      </div>
      <div className="grid gap-4">
        {filteredBooks.map(book => (
          <div key={book.id} className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold">{book.title}</h3>
            <p className="text-gray-600">{book.author} - {book.genre}</p>
            <p className="text-gray-600">Rating: {book.rating}</p>
            <Link to={`/book/${book.id}`} className="text-blue-500 hover:underline">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;