import stripe from 'app/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const success_url = `${process.env.BASE_URL}/discover`;
  const cancel_url = `${process.env.BASE_URL}/discover`;
  console.log(success_url,cancel_url);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Github Open Issue',
            },
            unit_amount: 2000, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url,
      cancel_url,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
