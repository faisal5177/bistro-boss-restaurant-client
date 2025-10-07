import { useEffect, useState } from 'react';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from 'react-simple-captcha';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { MdOutlineLockReset } from 'react-icons/md';
import loginImage from '../../assets/others/authentication2.png'; 
import './Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const userCaptcha = form.captcha.value;

    if (!validateCaptcha(userCaptcha)) {
      alert('Captcha does not match. Please try again.');
      form.captcha.value = '';
      return;
    }

    console.log('Email:', email);
    console.log('Password:', password);
    alert('Captcha matched! Logging in...');
    form.reset();
  };

  return (
    <div className="hero bg-loginImg mx-auto min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse gap-20">
        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset space-y-4">
            {/* Email Input */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Email"
                required
              />
            </div>

            {/* Password Input with Toggle */}
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="input input-bordered w-full pr-10"
                  placeholder="Password"
                  required
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-xl text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex items-center gap-2 text-sm text-blue-600 cursor-pointer hover:underline mt-2">
              <MdOutlineLockReset className="text-lg" />
              <span>Forgot password?</span>
            </div>

            {/* Captcha */}
            <div>
              <LoadCanvasTemplate />
              <input
                type="text"
                name="captcha"
                placeholder="Type the captcha above"
                className="input input-bordered mt-2 w-full"
                required
              />
            </div>
            {/* Submit Button */}
            <input
              type="submit"
              value="Login"
              className="btn btn-neutral mt-4 w-full"
            />
          </fieldset>
        </form>
        <div className="card md:w-[648px] md:h-[455px]  ">
          <div className="text-center p-20 lg:text-left">
           <img src={loginImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
