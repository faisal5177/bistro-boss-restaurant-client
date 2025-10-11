import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); 

  const { data: cart = [] } = useQuery({
    enabled: !!user?.email, 
    queryKey: ['cart', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cart?email=${user.email}`);
      return res.data;
    },
  });

  return [cart];
};

export default useCart;
