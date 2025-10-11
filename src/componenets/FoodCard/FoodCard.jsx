import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useQueryClient } from '@tanstack/react-query';


const FoodCard = ({ item }) => {
  const { image, name, recipe, price, _id } = item;
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const handleAddToCart = (food) => {
    if (user && user.email) {
      const cartItem = {
        memuId: _id,
        email: user.email,
        name,
        image,
        price,
      };

      axiosSecure.post('/carts', cartItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: 'top', 
            icon: 'success',
            title: `${name} added to your cart`,
            showConfirmButton: false,
            timer: 1500,
          });

          queryClient.invalidateQueries(['cart']); // ✅ refetch cart
        }
      });
    } else {
      Swal.fire({
        title: 'You are not Logged In',
        text: 'Please login to add to the cart?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, login!',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="card bg-base-100 shadow-lg w-96 mx-auto">
      <figure>
        <img className="h-[250px] w-full object-cover" src={image} alt={name} />
      </figure>
      <div className="absolute right-0 top-0 bg-slate-900 text-white px-4 py-2 m-4 rounded">
        <p className="text-lg bg-blick-500 font-bold  ">${price}</p>
      </div>

      <div className="card-body text-center">
        <h2 className="card-title justify-center text-xl font-semibold">
          {name}
        </h2>
        <p className="text-gray-600">{recipe}</p>
        <div className="card-actions justify-center mt-4">
          <button
            onClick={() => handleAddToCart(item)}
            className="btn btn-outline border-0 border-b-4 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
