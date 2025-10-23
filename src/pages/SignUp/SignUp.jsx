// SignUp.jsx
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SignUpImg from '../../assets/others/authentication2.png';
import '../LogIn/Login.css';
import SocialLogin from '../../componenets/SocialLogin/SocialLogin';

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            const userInfo = { name: data.name, email: data.email };
            axiosPublic.post('/users', userInfo)
              .then((res) => {
                if (res.data.insertedId) {
                  reset();
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate('/');
                }
              });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Sign up failed!',
          text: error.message,
        });
      });
  };

  return (
    <>
      <Helmet><title>Bistro Boss | Sign Up</title></Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <img src={SignUpImg} alt="Signup Illustration" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <h1 className="text-3xl font-bold text-center">Sign up now!</h1>

              {/* Name */}
              <div className="form-control">
                <label className="label"><span className="label-text">Name</span></label>
                <input type="text" {...register('name', { required: true })} placeholder="Name" className="input input-bordered" />
                {errors.name && <span className="text-red-600">Name is required</span>}
              </div>

              {/* Photo URL */}
              <div className="form-control">
                <label className="label"><span className="label-text">Photo URL</span></label>
                <input type="text" {...register('photoURL', { required: true })} placeholder="Photo URL" className="input input-bordered" />
                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label"><span className="label-text">Email</span></label>
                <input type="email" {...register('email', { required: true })} placeholder="Email" className="input input-bordered" />
                {errors.email && <span className="text-red-600">Email is required</span>}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label"><span className="label-text">Password</span></label>
                <input type="password" {...register('password', {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })} placeholder="Password" className="input input-bordered" />
                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be at least 6 characters</p>}
                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                {errors.password?.type === 'pattern' && <p className="text-red-600">Must include uppercase, lowercase, number & special character</p>}
              </div>

              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="Sign Up" />
              </div>
            </form>

            <p className="text-center mb-4">
              <small>
                Already have an account?
                <Link to="/login" className="text-blue-600 ml-2 font-bold">Login</Link>
              </small>
            </p>

            <div className="mx-auto pb-6">
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
