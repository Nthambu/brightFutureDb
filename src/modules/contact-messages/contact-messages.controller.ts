import {
  Body,
  Controller,
  Get,
  Ip,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ContactMessagesService } from './contact-messages.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageStatusDto } from './dto/update-contact-message-status.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Controller('api/v1/public/contact')
export class ContactMessagesPublicController {
  constructor(private readonly contactService: ContactMessagesService) {}

  @Post()
  create(@Body() dto: CreateContactMessageDto, @Ip() ip: string) {
    return this.contactService.create(dto, ip);
  }
}

// TODO: guard with @UseGuards(JwtAuthGuard, RolesGuard) once auth module exists
@Controller('api/v1/admin/contact-messages')
export class ContactMessagesAdminController {
  constructor(private readonly contactService: ContactMessagesService) {}

  @Get()
  findAll(
    @Query() pagination: PaginationDto,
    @Query('status') status?: string,
  ) {
    return this.contactService.findAll(pagination, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateContactMessageStatusDto,
  ) {
    return this.contactService.updateStatus(id, dto);
  }
}
