import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage } from './entities/contact-message.entity';
import { ContactMessageResponseDto, CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageStatusDto } from './dto/update-contact-message-status.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class ContactMessagesService {
  constructor(
    @InjectRepository(ContactMessage)
    private readonly contactRepo: Repository<ContactMessage>,
  ) {}

  async create(
    dto: CreateContactMessageDto,
    ipAddress?: string,
  ): Promise<ContactMessageResponseDto> {
    // Basic anti-spam: block more than 3 submissions from the same IP
    // within the last 10 minutes. Replace with a proper rate-limit guard
    // (e.g. @nestjs/throttler) or captcha before going to production.
    if (ipAddress) {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
      const recentCount = await this.contactRepo
        .createQueryBuilder('cm')
        .where('cm.ip_address = :ip', { ip: ipAddress })
        .andWhere('cm.created_at > :since', { since: tenMinutesAgo })
        .getCount();

      if (recentCount >= 3) {
        throw new BadRequestException(
          'Too many messages sent recently. Please try again later.',
        );
      }
    }

    const message = this.contactRepo.create({ ...dto, ipAddress });
    const saved = await this.contactRepo.save(message);

    // TODO: trigger notification email to staff here once the
    // notifications module + email provider integration exists.

  return {
  name: saved.name,
  email: saved.email,
  subject: saved.subject,
  message: saved.message,
  createdAt: saved.createdAt,
};
  }

  // TODO: guard this with admin/staff auth once the auth module exists
  async findAll(
    pagination: PaginationDto,
    status?: string,
  ): Promise<{ data: ContactMessage[]; total: number }> {
    const where = status ? { status: status as ContactMessage['status'] } : {};
    const [data, total] = await this.contactRepo.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      take: pagination.limit,
      skip: pagination.skip,
    });
    return { data, total };
  }

  async findOne(id: string): Promise<ContactMessage> {
    const message = await this.contactRepo.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException(`Message with id "${id}" not found`);
    }
    return message;
  }

  async updateStatus(
    id: string,
    dto: UpdateContactMessageStatusDto,
  ): Promise<ContactMessage> {
    const message = await this.findOne(id);
    message.status = dto.status;
    return this.contactRepo.save(message);
  }
}
