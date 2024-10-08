import stripe from 'app/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const success_url = `${process.env.BASE_URL}/discover`;
  const cancel_url = `${process.env.BASE_URL}/discover`;

  try {
    // Extracting the request body
    const { repositoryFullName, issueNumber, amountInCents } = await req.json();

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Github Open Issue',
            },
            unit_amount: amountInCents, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url,
      cancel_url,
      // Add metadata here
      metadata: {
        repositoryFullName,
        issueNumber,
        amountInCents,
      },
    });

    // Return the session URL in the response
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe Checkout session:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
