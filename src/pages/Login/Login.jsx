// LogIn.jsx
import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { AuthContext } from '../../providers/AuthProvider';
import LoginImg from '../../assets/others/authentication2.png';
import './Login.css';
import SocialLogin from '../../componenets/SocialLogin/SocialLogin';
import useAdmin from '../../hooks/useAdmin';

const LogIn = () => {
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [isAdmin] = useAdmin();

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        Swal.fire({
          title: isAdmin ? 'Admin Login Successful!' : 'User Login Successful!',
          icon: 'success',
          showClass: { popup: 'animate__animated animate__fadeInDown' },
          hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          title: 'Login Failed',
          text: error.message,
          icon: 'error',
        });
      });
  };

  const handleValidateCaptcha = (e) => {
    const userCaptchaValue = e.target.value;
    setDisabled(!validateCaptcha(userCaptchaValue));
  };

  return (
    <>
      <Helmet><title>Bistro Boss | Login</title></Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col md:flex-row-reverse">
          {/* Right Side Image */}
          <div className="text-center md:w-1/2 lg:text-left">
            <img src={LoginImg} alt="Login Illustration" />
          </div>

          {/* Login Card */}
          <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
            <h1 className="text-3xl text-center pt-10 font-bold">Login now!</h1>

            <form onSubmit={handleLogin} className="card-body">
              {/* Email */}
              <div className="form-control">
                <label className="label"><span className="label-text">Email</span></label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label"><span className="label-text">Password</span></label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} name="password" placeholder="password" className="input input-bordered w-full pr-10" required />
                  <span className="absolute top-3 right-3 text-xl cursor-pointer text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>
              </div>

              {/* Captcha */}
              <div className="form-control">
                <label className="label"><LoadCanvasTemplate /></label>
                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="Type the captcha above" className="input input-bordered" />
              </div>

              {/* Submit */}
              <div className="form-control mt-6">
                <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" />
              </div>

              {/* Sign Up Link */}
              <p className="text-center mt-5 mx-auto">
                <small>New here? <Link to="/signup" className="text-blue-700 font-bold">Create an account</Link></small>
              </p>

              {/* Social Login */}
              <div className="mx-auto"><SocialLogin /></div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
