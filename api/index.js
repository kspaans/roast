const stripe = require('stripe')(process.env.STRIPE_SECRET);
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/api/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1Kf7PCAlFwVdzE6LVkv49oka',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://roast.spaans.ca/success.html',
    cancel_url:  'https://roast.spaans.ca/cancel.html',
    shipping_address_collection: {
      allowed_countries: ['CA'],
    },
    shipping_options: [
      { shipping_rate: 'shr_1Kf7VPAlFwVdzE6LS76d1Gdn' },
      { shipping_rate: 'shr_1Kf7WCAlFwVdzE6LmlHhPgGN' },
    ],
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));
