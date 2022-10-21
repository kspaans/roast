const stripe = require('stripe')(process.env.STRIPE_SECRET);
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/api/create-checkout-session', async (req, res) => {
  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', async () => {
    body = Buffer.concat(body).toString();
    const product = body.split('=')[1];
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: product,
          quantity: 1,
          adjustable_quantity: { enabled: true },
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
});

app.listen(4242, () => console.log('Running on port 4242'));
