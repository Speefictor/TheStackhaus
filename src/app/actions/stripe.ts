'use server';

import { redirect } from 'next/navigation';
import type { Item } from '@/hooks/use-cart';
import Stripe from 'stripe';

require('dotenv').config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function createCheckoutSession(items: Item[]) {
  const line_items = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        images: [item.imageUrl.startsWith('http') ? item.imageUrl : 'https://placehold.co/128x128.png'],
      },
      unit_amount: Math.round(item.price * 100), // price in cents
    },
    quantity: item.quantity,
  }));

  // Ensure there's a success and cancel URL
  const host = process.env.NEXT_PUBLIC_HOST || 'http://localhost:9002';

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `${host}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${host}/order`,
  });

  if (session.url) {
    redirect(session.url);
  } else {
    throw new Error('Could not create Stripe checkout session');
  }
}
