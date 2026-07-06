import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { MembersService } from './members.service';
import {
  MembersAdminController,
  MembersPublicController,
} from './members.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [MembersPublicController, MembersAdminController],
  providers: [MembersService],
  exports: [MembersService],
})
export class MembersModule {}
