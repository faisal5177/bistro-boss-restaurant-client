import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { RiDeleteBin5Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: bookings = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/bookings');
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This booking will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/bookings/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Booking has been removed.', 'success');
              refetch();
            } else {
              Swal.fire('Error', 'Failed to delete booking.', 'error');
            }
          })
          .catch((error) => {
            Swal.fire('Error', error.message || 'Deletion failed', 'error');
          });
      }
    });
  };

  if (isLoading) {
    return <div className="p-6">Loading bookings...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-red-600">
        Failed to load bookings: {error?.message || 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Manage All Bookings</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>Activity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.email}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.activity}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="btn btn-ghost"
                    >
                      <RiDeleteBin5Line className="text-red-600 text-lg" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
