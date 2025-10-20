import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const CheckoutForm = ({ cart, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post('/create-payment-intent', { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: methodError } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (methodError) {
      setError(methodError.message);
      return;
    } else {
      setError('');
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous',
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
    } else if (paymentIntent?.status === 'succeeded') {
      setTransactionId(paymentIntent.id);

      // save payment info to database
      const paymentInfo = {
        email: user.email,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        cartIds: cart.map((item) => item._id),
        status: 'succeeded',
      };
      axiosSecure.post('/payments', paymentInfo);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto mt-10 space-y-4">
      <CardElement
        options={{
          style: {
            base: { fontSize: '16px', color: '#434770' },
            invalid: { color: '#9e2146' },
          },
        }}
      />
      <button
        className="btn btn-sm btn-primary"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {transactionId && (
        <p className="text-green-500">Transaction ID: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
