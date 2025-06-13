import { useParams } from 'react-router-dom';
import { useState } from 'react';

function BookDetails({ books, setBooks }) {
  const { id } = useParams();
  const book = books.find(b => b.id === parseInt(id));
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const addReview = (e) => {
    e.preventDefault();
    if (!review || rating === 0) return;
    const updatedReviews = [...book.reviews, { text: review, rating }];
    const newAverageRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
    setBooks(books.map(b =>
      b.id === book.id ? { ...b, reviews: updatedReviews, rating: newAverageRating.toFixed(1) } : b
    ));
    setReview('');
    setRating(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
        <p className="text-gray-600 mb-1">Author: {book.author}</p>
        <p className="text-gray-600 mb-1">Genre: {book.genre}</p>
        <p className="text-gray-600 mb-4">Rating: {book.rating}</p>
        <h3 className="text-lg font-semibold mb-2">Reviews</h3>
        <ul className="list-disc pl-5 mb-4">
          {book.reviews.map((r, index) => (
            <li key={index} className="text-gray-700">{r.text} (Rating: {r.rating})</li>
          ))}
        </ul>
      </div>
      <form onSubmit={addReview} className="mt-5 flex flex-col gap-3">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write a review"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="p-3 border border-gray-300 rounded-md"
        >
          <option value="0">Select Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default BookDetails;