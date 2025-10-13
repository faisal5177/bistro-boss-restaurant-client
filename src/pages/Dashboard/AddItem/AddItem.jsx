// AddItem.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddItem = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    data.price = parseFloat(data.price);
    try {
      const res = await axiosSecure.post('/menu', data);
      if (res.data.insertedId) {
        Swal.fire('Success!', 'Item added successfully', 'success');
        reset();
      }
    } catch (err) {
      Swal.fire('Error', 'Failed to add item', 'error');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Item</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('name', { required: true })}
          placeholder="Item Name"
          className="input input-bordered w-full"
        />
        <input
          {...register('category', { required: true })}
          placeholder="Category (e.g. drinks)"
          className="input input-bordered w-full"
        />
        <input
          {...register('price', { required: true })}
          placeholder="Price"
          type="number"
          className="input input-bordered w-full"
        />
        <input
          {...register('image', { required: true })}
          placeholder="Image URL"
          className="input input-bordered w-full"
        />
        <textarea
          {...register('recipe')}
          placeholder="Recipe Details"
          className="textarea textarea-bordered w-full"
        />
        <button type="submit" className="btn btn-primary w-full">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
