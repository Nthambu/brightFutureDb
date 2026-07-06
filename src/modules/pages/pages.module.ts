import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';
import { PagesService } from './pages.service';
import {
  PagesAdminController,
  PagesPublicController,
} from './pages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  controllers: [PagesPublicController, PagesAdminController],
  providers: [PagesService],
  exports: [PagesService],
})
export class PagesModule {}
