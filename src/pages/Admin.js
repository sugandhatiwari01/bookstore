import { useState } from 'react';

function Admin({ books, setBooks }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState(0);

  const addBook = (e) => {
    e.preventDefault();
    const newBook = {
      id: books.length + 1,
      title,
      author,
      genre,
      rating: parseFloat(rating),
      reviews: [],
    };
    setBooks([...books, newBook]);
    setTitle('');
    setAuthor('');
    setGenre('');
    setRating(0);
  };

  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <form onSubmit={addBook} className="flex flex-col gap-3 mb-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Book Title"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Genre"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Initial Rating (0-5)"
          min="0"
          max="5"
          step="0.1"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600"
        >
          Add Book
        </button>
      </form>
      <ul className="divide-y divide-gray-200">
        {books.map(book => (
          <li
            key={book.id}
            className="flex justify-between items-center p-3"
          >
            <span>{book.title} by {book.author}</span>
            <button
              onClick={() => deleteBook(book.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;