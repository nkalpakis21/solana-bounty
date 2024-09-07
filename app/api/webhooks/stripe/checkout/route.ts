import stripe from 'app/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    // Read the raw body
    const rawBody = await req.text();

    // Verify and construct the event
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return new NextResponse('Webhook Error: Invalid signature', { status: 400 });
  }

  // Handle the event types you're interested in
  switch (event.type) {
    case 'payment_intent.canceled': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent for ${paymentIntent.amount} was canceled!`);
        // Handle canceled payment here
        break;
      }
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Handle successful payment here
      break;
    }
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`PaymentIntent for ${paymentIntent.amount} failed.`);
      // Handle failed payment here
      break;
    }
    // Add more event types if needed
    default:
      console.warn(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
