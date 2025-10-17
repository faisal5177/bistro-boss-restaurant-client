import { Helmet } from 'react-helmet-async';
import { FaHome, FaShoppingCart } from 'react-icons/fa';
import useCart from '../../../hooks/useCart';
import { Link } from 'react-router-dom';

const UserHome = () => {
  const [cart] = useCart();

  return (
    <div className="p-8">
      {/* Page Title */}
      <Helmet>
        <title>Bistro Boss | User Home</title>
      </Helmet>

      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-orange-500 mb-2">
          Welcome to your Dashboard!
        </h1>
        <p className="text-gray-700 text-lg">
          Here you can view your cart, bookings, and manage your reservations.
        </p>
      </div>

      {/* Cart Summary */}
      <div className="flex items-center gap-4 mb-6">
        <FaShoppingCart className="text-orange-500 text-3xl" />
        <span className="text-xl font-semibold">
          You have {cart?.length || 0} item{cart?.length === 1 ? '' : 's'} in
          your cart.
        </span>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded shadow hover:shadow-lg transition">
          <FaHome className="text-orange-500 text-3xl mb-3" />
          <h3 className="text-xl font-bold mb-2">My Home</h3>
          <p className="text-gray-600">
            Overview of your dashboard, cart, and activities.
          </p>
        </div>

        <div className="p-6 border rounded shadow hover:shadow-lg transition">
          <Link to='/dashboard/cart'>
          <FaShoppingCart className="text-orange-500 text-3xl mb-3" />
          <h3 className="text-xl font-bold mb-2">My Cart</h3>
          </Link>
          <p className="text-gray-600">
            Check your selected items and proceed to payment.
          </p>
        </div>

        <div className="p-6 border rounded shadow hover:shadow-lg transition">
         <Link to="/dashboard/reservation">
          <FaHome className="text-orange-500 text-3xl mb-3" />
          <h3 className="text-xl font-bold mb-2">Reservations</h3>
         </Link>
          <p className="text-gray-600">
            Manage your table bookings and upcoming reservations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
