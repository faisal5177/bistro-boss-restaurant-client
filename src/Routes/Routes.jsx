import { createBrowserRouter, Navigate } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../pages/Home/Home/Home';
import Menu from './../pages/Menu/Menu';
import Order from '../componenets/Order/Order/Order';
import SignUp from '../pages/SignUp/SignUp';
import Contact from './../pages/Home/Contact/Contact';
import Dashboard from '../Layout/Dashboard/Dashboard';
import Cart from '../pages/Dashboard/Cart/Cart';
import LogIn from '../pages/Login/Login';
import PrivateRoute from './PrivateRoute';
import AllUsers from '../pages/Dashboard/AllUsers/AllUsers';
import MyBookings from '../pages/Dashboard/MyBookings/MyBookings';
import ManageBookings from '../pages/Dashboard/ManageBookings/ManageBookings';
import ManageItems from '../pages/Dashboard/ManageItems/ManageItems';
import AdminHome from '../pages/Dashboard/AdminHome/AdminHome';
import Reservation from '../pages/Dashboard/Reservation/Reservation';
import AddReview from '../pages/Dashboard/AddReview/AddReview';
import AdminRoute from './AdminRoute';
import AddItem from '../pages/Dashboard/AddItem/AddItem';
import UpdateItem from './../pages/Dashboard/UpdateItem/UpdateItem';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: 'menu',
        element: <Menu></Menu>,
      },
      {
        path: 'order',
        element: <Navigate to="/order/salad" replace />,
      },
      {
        path: 'order/:category',
        element: <Order />,
      },
      {
        path: 'logIn',
        element: <LogIn />,
      },
      {
        path: 'signUp',
        element: <SignUp></SignUp>,
      },
      {
        path: 'contact',
        element: <Contact></Contact>,
      },
    ],
  },
  {
    path: 'dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // admin only routes
      {
        path: 'adminHome',
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: 'users',
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: 'bookings',
        element: (
          <AdminRoute>
            <ManageBookings />
          </AdminRoute>
        ),
      },
      {
        path: 'addItem',
        element: (
          <AdminRoute>
            <AddItem />
          </AdminRoute>
        ),
      },
      {
        path: 'manageItems',
        element: (
          <AdminRoute>
            <ManageItems />
          </AdminRoute>
        ),
      },
      {
        path: 'updateItem/:id',
        element: <UpdateItem />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/menu/${params.id}`),
      },
      //   normal user routes
      {
        path: 'reservation',
        element: <Reservation />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'review',
        element: <AddReview />,
      },
      {
        path: 'myBookings',
        element: <MyBookings />,
      },
    ],
  },
]);

export default router;
