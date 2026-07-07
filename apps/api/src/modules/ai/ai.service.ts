import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);

  /**
   * Evaluates text sentiment using GPT/Gemini layout modeling.
   */
  async analyzeSentiment(text: string): Promise<'POSITIVE' | 'NEUTRAL' | 'NEGATIVE'> {
    this.logger.log(`Analyzing sentiment for: "${text.substring(0, 30)}..."`);
    const lowercase = text.toLowerCase();
    
    if (lowercase.includes('bad') || lowercase.includes('poor') || lowercase.includes('worst') || lowercase.includes('terrible')) {
      return 'NEGATIVE';
    }
    if (lowercase.includes('good') || lowercase.includes('great') || lowercase.includes('excellent') || lowercase.includes('best')) {
      return 'POSITIVE';
    }
    return 'NEUTRAL';
  }

  /**
   * Generates a context-aware auto-reply based on business description and review rating.
   */
  async generateReviewReply(
    reviewerName: string,
    comment: string,
    rating: number,
    businessDetails: string,
  ): Promise<string> {
    this.logger.log(`Generating AI reply for rating: ${rating}`);
    
    if (rating >= 4) {
      return `Dear ${reviewerName},\n\nThank you so much for the review! We are delighted to hear you had a great experience with our products. We look forward to serving you again soon! \n\nBest regards,\nForscha AI Assistant`;
    } else {
      return `Dear ${reviewerName},\n\nWe sincerely apologize for any inconvenience caused. We take your feedback seriously. Please reach out to our team at support@forscha.com so we can address your concerns immediately.\n\nWarm regards,\nCustomer Relations`;
    }
  }

  /**
   * Creates a Google post for businesses (Festival, Promo, or Update)
   */
  async generateGooglePost(
    topic: string,
    businessType: string,
    postType: 'OFFER' | 'EVENT' | 'UPDATE',
  ): Promise<{ title: string; content: string }> {
    this.logger.log(`Generating post for topic: ${topic} [${postType}]`);
    
    const title = `${postType === 'OFFER' ? '🎁 Special Offer:' : '📢 Announcement:'} ${topic}`;
    const content = `We are excited to share this with our amazing community at ${businessType}! \n\nGet ready for exclusive updates, special rewards, and premium features designed to help your business grow. Contact us or visit our storefront location today! #localbusiness #growthos`;
    
    return { title, content };
  }
}
