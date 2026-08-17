export const STRIPE_PUBLIC_KEY = process.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_demo';
export const PLANS = {
  pro: {
    id: 'price_pro_monthly',
    name: 'Athlete Hub Pro',
    price: 4.99,
    interval: 'month',
    features: ['Unlimited highlights', 'Advanced stats', 'Custom profile', 'Game history', 'AI insights'],
  },
  annual: {
    id: 'price_pro_annual',
    name: 'Athlete Hub Pro Annual',
    price: 29.99,
    interval: 'year',
    features: ['Unlimited highlights', 'Advanced stats', 'Custom profile', 'Game history', 'AI insights'],
  },
};

export async function createCheckoutSession(planId: string, userId: string): Promise<string> {
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId, userId }),
    });
    const data = await response.json();
    return data.sessionId || '';
  } catch (e) {
    console.error('Checkout error:', e);
    return '';
  }
}
