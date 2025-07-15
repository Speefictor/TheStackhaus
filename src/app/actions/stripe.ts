'use server';

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import type { Item } from '@/hooks/use-cart';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function createCheckoutSession(items: Item[]) {
  const line_items = items.map(item => {
    // Stripe requires valid, publicly accessible image URLs.
    // We'll use a valid fallback image if the item's image is a placeholder.
    const isPlaceholder = item.imageUrl.startsWith('https://placehold.co');
    const validImageUrl = isPlaceholder
      ? 'https://gourmondoco.com/cdn/shop/files/Assorted_Sandwiches.jpg?v=1751062061&width=768'
      : item.imageUrl;

    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [validImageUrl],
        },
        unit_amount: Math.round(item.price * 100), // price in cents
      },
      quantity: item.quantity,
    };
  });

  const headersList = headers();
  const host = headersList.get('host') || 'localhost:9002';
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  const successUrl = `${protocol}://${host}/order/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${protocol}://${host}/order`;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    if (session.url) {
      redirect(session.url);
    } else {
      // This case should ideally not be reached if session creation is successful.
      throw new Error('Stripe session was created but no URL was returned.');
    }
  } catch (error) {
    // Log the full error from Stripe for better debugging
    console.error("Stripe session creation failed:", error);
    
    // Re-throw a more informative error for the client-side to catch
    if (error instanceof Error) {
        throw new Error(`Could not create Stripe checkout session: ${error.message}`);
    }
    throw new Error('Could not create Stripe checkout session due to an unknown error.');
  }
}
