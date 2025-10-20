import { RiDeleteBin6Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useCart from '../../../hooks/useCart';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Cart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleDelete = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${item._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
          }
        });
      }
    });
  };

  return (
    <div className="px-4 md:px-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h3 className="text-2xl md:text-3xl font-semibold">
          Total Items: {cart.length}
        </h3>
        <h3 className="text-2xl md:text-3xl font-semibold">
          Total Price: ${totalPrice.toFixed(2)}
        </h3>
        <Link to="/dashboard/payment">
          <button
            className="btn btn-warning btn-sm md:btn-md font-semibold"
            disabled={cart.length === 0}
          >
            Pay
          </button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="table table-zebra w-full text-center">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="w-[5%]">#</th>
              <th className="w-[12%]">Image</th>
              <th className="w-[45%]">Item Name</th>
              <th className="w-[20%]">Price</th>
              <th className="w-[10%]">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id} className="hover">
                <td>{index + 1}</td>
                <td>
                  <div className="w-12 h-12 mx-auto rounded overflow-hidden border">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </td>
                <td className="font-medium">{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-ghost btn-xs text-red-600 hover:bg-red-100"
                    title="Delete Item"
                  >
                    <RiDeleteBin6Fill size={18} />
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

export default Cart;
