// CheckoutForm.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Get card details from the CardElement
    const cardElement = elements.getElement(CardElement);

    // Create a payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    try {
      // Send payment method to the server to create a payment intent
      const { data } = await axios.post('/create-payment-intent', {
        paymentMethodId: paymentMethod.id,
      });

      const confirmPayment = await stripe.confirmCardPayment(data.clientSecret);
      
      if (confirmPayment.error) {
        setError(confirmPayment.error.message);
      } else if (confirmPayment.paymentIntent.status === 'succeeded') {
        setSuccess('Payment successful!');
        onPaymentSuccess();
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" className="btn btn-primary mt-3" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      {error && <p className="text-danger mt-2">{error}</p>}
      {success && <p className="text-success mt-2">{success}</p>}
    </form>
  );
};

export default CheckoutForm;
