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
import AddItem from '../pages/Dashboard/AddItem/AddItem';
import ManageItems from '../pages/Dashboard/ManageItems/ManageItems';
import AdminHome from '../pages/Dashboard/AdminHome/AdminHome';
import Reservation from '../pages/Dashboard/Reservation/Reservation';
import AddReview from '../pages/Dashboard/AddReview/AddReview';

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
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'users',
        element: <AllUsers />,
      },
      {
        path: 'bookings',
        element: <ManageBookings />,
      },
      {
        path: 'addItem',
        element: <AddItem />,
      },
      {
        path: 'manageItems',
        element: <ManageItems />,
      },
      {
        path: 'adminHome',
        element: <AdminHome />,
      },
      {
        path: 'reservation',
        element: <Reservation />,
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
