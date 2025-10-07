import { Link } from "react-router-dom";

const NavBar = () => {
  const navOptions = (
    <>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <a>CONTACT us</a>
      </li>
      <li>
        <a>DASHBOARD</a>
      </li>
      <li>
        <Link to='/menu'>Our Menu</Link>
      </li>
      <li>
        <Link to='/order'>Order Food</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar fixed z-10 max-w-screen-xl bg-opacity-30 text-white shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            <a className="btn btn-ghost text-xl">BISTRO BOSS</a>
            <div className="flex -mt-3 gap-[7px] ml-[18px] text-xs">
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
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navOptions}</ul>
          </div>
          <a className="btn">Button</a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
