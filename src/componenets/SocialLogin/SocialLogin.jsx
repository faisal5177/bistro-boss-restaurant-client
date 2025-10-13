// SocialLogin.jsx
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useAuth from './../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        if (!user) return;

        const userInfo = {
          email: user.email,
          name: user.displayName,
        };

        axiosPublic.post('/users', userInfo).then((res) => {
          console.log('User saved:', res.data);
          navigate('/');
        });
      })
      .catch((error) => {
        console.error('Google sign-in error:', error);
      });
  };

  return (
    <div className="px-8 pb-6">
      <div className="divider"></div>
      <button
        onClick={handleGoogleSignIn}
        className="btn w-full bg-blue-700 hover:bg-blue-900 text-white flex items-center gap-2 justify-center"
      >
        <FaGoogle className='text-lg'/>
        <span className='font-semibold text-xs'>Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
