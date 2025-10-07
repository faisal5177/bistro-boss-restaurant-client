import { useEffect, useRef, useState } from 'react';
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
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  // Handle form submission
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const captchaValue = captchaRef.current.value;

    if (!validateCaptcha(captchaValue)) {
      alert('Captcha does not match. Please try again.');
      captchaRef.current.value = '';
      setDisabled(true);
      return;
    }

    console.log('Email:', email);
    console.log('Password:', password);
    alert('Captcha matched! Logging in...');
    form.reset();
    setDisabled(true);
  };

  // Validate captcha and enable login button
  const handleValidateCaptcha = (e) => {
    e.preventDefault();
    const userCaptchaValue = captchaRef.current.value;
    if (validateCaptcha(userCaptchaValue)) {
      setDisabled(false);
      alert('Captcha Matched');
    } else {
      setDisabled(true);
      alert('Captcha does not match');
    }
  };

  return (
    <div className="hero bg-loginImg mx-auto min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse gap-20">
        {/* Login Image Section */}
        <div className="card md:w-[648px] md:h-[455px]">
          <form onSubmit={handleLogin} className="card-body -mt-10 w-full max-w-md">
            <fieldset className="fieldset space-y-4">
              {/* Email */}
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

              {/* Password with toggle */}
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

              {/* Forgot Password (UI Only) */}
              <div className="flex items-center gap-2 text-sm text-blue-600 cursor-pointer hover:underline mt-2">
                <MdOutlineLockReset className="text-lg" />
                <span>Forgot password?</span>
              </div>

              {/* Captcha */}
              <div>
                <LoadCanvasTemplate />
                <input
                  type="text"
                  ref={captchaRef}
                  name="captcha"
                  placeholder="Type the captcha above"
                  className="input input-bordered mt-2 w-full"
                  required
                />
                <button
                  onClick={handleValidateCaptcha}
                  className="btn btn-accent mt-3 w-full"
                  type="button"
                >
                  Validate Captcha
                </button>
              </div>

              {/* Submit */}
              <input
                type="submit"
                value="Login"
                className="btn btn-neutral mt-4 w-full"
                disabled={disabled}
              />
            </fieldset>
          </form>
        </div>

        {/* Login Form Section */}

        <div className="text-center p-20 lg:text-left">
          <img src={loginImage} alt="Login Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;
