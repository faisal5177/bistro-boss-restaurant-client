import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AddReview = () => {
  const axiosSecure = useAxiosSecure();
  const [review, setReview] = useState({
    name: '',
    details: '',
    rating: 5,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.post('/reviews', review);
      alert('Review added!');
      setReview({ name: '', details: '', rating: 5 });
    } catch (err) {
      console.error(err);
      alert('Failed to add review');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">
        Add a Review
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={review.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <textarea
          name="details"
          placeholder="Write your review"
          value={review.details}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <select
          name="rating"
          value={review.rating}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 ? 's' : ''}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full py-3 bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600 transition-colors"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
