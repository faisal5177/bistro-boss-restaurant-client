import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CheckoutForm = () => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [cart, refetch] = useCart();
  const navigate = useNavigate();

  //  calculate total
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  //  create payment intent when total changes
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post('/create-payment-intent', { price: totalPrice })
        .then((res) => {
          console.log(' Client Secret:', res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error(' Error creating payment intent:', err);
        });
    }
  }, [axiosSecure, totalPrice]);

  //  handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) return;

    //  create payment method
    const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (paymentError) {
      console.error(' Payment method error:', paymentError);
      setError(paymentError.message);
      return;
    } else {
      setError('');
      console.log(' Payment method created:', paymentMethod);
    }

    //  confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        },
      },
    });

    if (confirmError) {
      console.error(' confirmCardPayment error:', confirmError);
      setError(confirmError.message);
      return;
    }

    console.log(' PaymentIntent:', paymentIntent);

    if (paymentIntent.status === 'succeeded') {
      setTransactionId(paymentIntent.id);

      //  save payment to database
      const payment = {
        email: user.email,
        price: totalPrice,
        transactionId: paymentIntent.id,
        date: new Date(),
        cartIds: cart.map((item) => item._id),
        menuItemIds: cart.map((item) => item.menuId),
        status: 'completed',
      };

      try {
        const res = await axiosSecure.post('/payments', payment);
        console.log(' Payment saved:', res.data);
        refetch();

        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Thank you for your payment!',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/dashboard/paymentHistory');
        }
      } catch (err) {
        console.error(' Error saving payment:', err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': { color: '#aab7c4' },
            },
            invalid: { color: '#9e2146' },
          },
        }}
      />
      <button
        className="btn btn-sm btn-primary my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>

      {/*  error and success display */}
      {error && <p className="text-red-600">{error}</p>}
      {transactionId && (
        <p className="text-green-600">
           Transaction successful! Your ID: {transactionId}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
