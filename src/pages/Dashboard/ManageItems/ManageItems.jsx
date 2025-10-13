// src/pages/Dashboard/ManageItems/ManageItems.jsx
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { RiDeleteBin6Line } from 'react-icons/ri';

const ManageItems = () => {
  const axiosSecure = useAxiosSecure();

  const { data: menu = [], refetch } = useQuery({
    queryKey: ['menu'],
    queryFn: async () => {
      const res = await axiosSecure.get('/menu');
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This item will be deleted permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/menu/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire('Deleted!', 'Item has been deleted.', 'success');
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Manage Menu Items</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Category</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>${item.price}</td>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-ghost text-red-600 text-xl"
                    onClick={() => handleDelete(item._id)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                  {/* Optional Edit Button */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {menu.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No items found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageItems;
