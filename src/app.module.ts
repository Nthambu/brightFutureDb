import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { PagesModule } from './modules/pages/pages.module';
import { MembersModule } from './modules/members/members.module';
import { ContactMessagesModule } from './modules/contact-messages/contact-messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseConfig()),
    PagesModule,
    MembersModule,
    ContactMessagesModule,
  ],
})
export class AppModule {}
