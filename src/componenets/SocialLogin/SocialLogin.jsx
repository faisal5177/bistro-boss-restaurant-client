// SocialLogin.jsx
import { FaGoogle } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from './../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAdmin from '../../hooks/useAdmin';

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [isAdmin] = useAdmin(); // admin check

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        if (!user) return;

        const userInfo = {
          email: user.email,
          name: user.displayName,
        };

        axiosPublic.post('/users', userInfo)
          .then((res) => {
            // Success alert
            Swal.fire({
              icon: 'success',
              title: isAdmin ? 'Admin Login Successful with Google!' : 'User Login Successful with Google!',
              showConfirmButton: false,
              timer: 1500,
            });

            // Navigate after success
            navigate(from, { replace: true });
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Something went wrong!',
              text: error.message,
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Google Sign-In Failed!',
          text: error.message,
        });
      });
  };

  return (
    <div className="px-8 pb-6">
      <div className="divider"></div>
      <button
        onClick={handleGoogleSignIn}
        className="btn w-full bg-blue-700 hover:bg-blue-900 text-white flex items-center gap-2 justify-center"
      >
        <FaGoogle className="text-lg" />
        <span className="font-semibold text-xs">Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
