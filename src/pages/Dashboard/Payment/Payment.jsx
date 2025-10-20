// Payment.jsx
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SectionTitle from '../../../componenets/SectionTitle/SectionTitle';
import CheckoutForm from './CheckoutForm';
import useCart from '../../../hooks/useCart';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const [cart] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <SectionTitle heading="Payment" subHeading="Please pay to eat" />
      <div className="w-96 mx-auto">
        <Elements stripe={stripePromise}>
          <CheckoutForm cart={cart} price={totalPrice} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
