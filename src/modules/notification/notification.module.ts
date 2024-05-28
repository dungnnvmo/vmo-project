import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EmailModule } from '@email/email.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [EmailModule, ConfigModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
