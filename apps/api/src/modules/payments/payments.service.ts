import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private stripe: Stripe | null = null;

  constructor() {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (stripeKey) {
      this.stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' as any });
    }
  }

  /**
   * Generates Stripe Payment checkout link
   */
  async createStripeSession(amount: number, currency: string, successUrl: string, cancelUrl: string): Promise<string> {
    this.logger.log(`Creating Stripe Checkout Session of: ${amount} ${currency}`);
    if (!this.stripe) {
      // Mock session link for local developer usage
      return `https://checkout.stripe.com/c/pay/mock_session_${Math.random().toString(36).substring(7)}`;
    }
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: { name: 'Forscha Labs SaaS Growth OS Subscription' },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    return session.url || '';
  }

  /**
   * Generates Razorpay Order details
   */
  async createRazorpayOrder(amount: number, receiptId: string) {
    this.logger.log(`Creating Razorpay Order for receipt: ${receiptId}`);
    return {
      orderId: `order_${Math.random().toString(36).substring(7)}`,
      amount: amount * 100, // In Paise
      currency: 'INR',
      receipt: receiptId,
      status: 'created',
      key: process.env.RAZORPAY_KEY_ID || 'rzp_test_mock_keys',
    };
  }

  /**
   * Generates Cashfree Link for immediate UPI / Wallet collections
   */
  async createCashfreeLink(amount: number, customerPhone: string, customerEmail: string) {
    this.logger.log(`Creating Cashfree Payment Link for customer: ${customerEmail}`);
    return {
      linkId: `cf_link_${Math.random().toString(36).substring(7)}`,
      paymentUrl: `https://cf.cashfree.com/mock_pay/link_${Math.random().toString(36).substring(7)}`,
      amount,
      customerPhone,
      customerEmail,
    };
  }
}
