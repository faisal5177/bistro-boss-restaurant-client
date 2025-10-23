import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

//  axios instance
const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
    //  Request interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access-token');

        //  Debug: Check token
        if (token) {
          console.log(' Sending token:', token);
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          console.warn('⚠️ No token found in localStorage!');
        }

        return config;
      },
      (error) => {
        console.error(' Request error:', error);
        return Promise.reject(error);
      }
    );

    //  Response interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error?.response?.status;

        // Debug: Show status
        if (status) console.warn('⚠️ Response status:', status);

        if (status === 401 || status === 403) {
          console.log('🚪 Unauthorized! Logging out...');
          try {
            await logOut();
          } finally {
            navigate('/login', { replace: true });
          }
        }

        return Promise.reject(error);
      }
    );

    //  Cleanup interceptors
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
