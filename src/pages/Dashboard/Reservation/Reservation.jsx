import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Reservation = () => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    activity: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.post('/payment', formData);
      alert('Reservation successful');
      setFormData({ date: '', time: '', activity: '', phone: '' });
    } catch (error) {
      console.error(error);
      alert('Failed to reserve');
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 border rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
        Make a Reservation
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="text"
          name="activity"
          placeholder="Activity"
          value={formData.activity}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          type="submit"
          className="w-full py-3 bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600 transition-colors"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Reservation;
