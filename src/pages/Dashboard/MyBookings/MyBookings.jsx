import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ['bookings', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Cancel Booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookings/${id}`).then(() => {
          Swal.fire('Cancelled!', 'Your booking has been removed.', 'success');
          refetch();
        });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4 font-bold">My Bookings</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Time</th>
              <th>Activity</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={b._id}>
                <td>{i + 1}</td>
                <td>{b.date}</td>
                <td>{b.time}</td>
                <td>{b.activity}</td>
                <td>{b.phone}</td>
                <td>
                  <button
                    onClick={() => handleCancel(b._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
