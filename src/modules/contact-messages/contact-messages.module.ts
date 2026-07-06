import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactMessage } from './entities/contact-message.entity';
import { ContactMessagesService } from './contact-messages.service';
import {
  ContactMessagesAdminController,
  ContactMessagesPublicController,
} from './contact-messages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContactMessage])],
  controllers: [
    ContactMessagesPublicController,
    ContactMessagesAdminController,
  ],
  providers: [ContactMessagesService],
  exports: [ContactMessagesService],
})
export class ContactMessagesModule {}
