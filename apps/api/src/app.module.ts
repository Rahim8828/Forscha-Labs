import { Module } from '@nestjs/common';
import { AIService } from './modules/ai/ai.service';
import { PaymentsService } from './modules/payments/payments.service';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AIService, PaymentsService],
})
export class AppModule {}
