import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import { MdShoppingCart } from 'react-icons/md';
import useCart from '../../../hooks/useCart';
import useAdmin from '../../../hooks/useAdmin';

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [cart] = useCart();

  const handleLogOut = () => logOut().catch(err => console.log(err));

  const navOptions = (
    <>
      <li className= "text-orange-500 hover:text-white">
        <Link to="/">Home</Link>
      </li>
      <li className= "text-orange-500 hover:text-white">
        <Link to="/contact">Contact Us</Link>
      </li>
      {user && isAdmin && (
        <li className= "text-orange-500 hover:text-white">
          <Link to="/dashboard/adminHome">Dashboard</Link>
        </li>
      )}
      {user && !isAdmin && (
        <li className= "text-orange-500 hover:text-white">
          <Link to="/dashboard/userHome">Dashboard</Link>
        </li>
      )}
      <li className= "text-orange-500 hover:text-white">
        <Link to="/menu">Our Menu</Link>
      </li>
      <li className= "text-orange-500 hover:text-white">
        <Link to="/dashboard/cart" className="flex items-center">
          <MdShoppingCart className="mr-1" />
          <div className="badge badge-sm badge-secondary">{cart.length}</div>
        </Link>
      </li>
      <li className= "text-orange-500 hover:text-white">
        <Link to="/order/salad">Order Food</Link>
      </li>
      {user ? (
        <>
          <li className= "text-orange-500 hover:text-white">
            <span>{user.displayName}</span>
          </li>
          <li className= "text-orange-500 hover:text-white">
            <button onClick={handleLogOut}>Logout</button>
          </li>
        </>
      ) : (
        <li className= "text-orange-500 hover:text-white">
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );



  return (
    <div>
      <div className="navbar fixed z-10 max-w-screen-xl bg-opacity-30 text-white shadow-sm">
        <div className="navbar-start">
          <div className="dropdown ">
            <div tabIndex={0} role="button" className="btn btn-ghost  lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-orange-500 hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {' '}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{' '}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navOptions}
            </ul>
          </div>
          <div className="flex flex-col text-left">
            <a className="btn btn-ghost text-xl text-orange-500 hover:text-white">BISTRO BOSS</a>
            <div className="flex -mt-3 gap-[7px] ml-[18px] text-xs text-orange-500 hover:text-white">
              <p>R</p>
              <p>e</p>
              <p>s</p>
              <p>t</p>
              <p>a</p>
              <p>u</p>
              <p>r</p>
              <p>a</p>
              <p>n</p>
              <p>t</p>
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-center  hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navOptions}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;