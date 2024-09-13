// server.js
const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();
const stripe = Stripe('sk_test_51PxeCCI4N1Y5k58Aic1zsM2i3G4BUegZkCFWsxHxMZrhKGT5UETf7dVpHG7yCz3etiNYYq0WLB2QcdEkNj3ekpIJ00LPqWv1iJ'); // Your Stripe Secret Key

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,
      currency: 'usd',
      payment_method: req.body.paymentMethodId,
      confirm: true,
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
