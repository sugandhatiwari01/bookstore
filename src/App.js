import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import Admin from './pages/Admin';
import { useState } from 'react';
import booksData from './data/books.json';

function App() {
  const [books, setBooks] = useState(booksData);

  return (
    <BrowserRouter>
      <nav className="bg-blue-500 p-4 flex gap-4">
        <Link to="/" className="text-white hover:underline">Home</Link>
        <Link to="/admin" className="text-white hover:underline">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home books={books} />} />
        <Route path="/book/:id" element={<BookDetails books={books} setBooks={setBooks} />} />
        <Route path="/admin" element={<Admin books={books} setBooks={setBooks} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;