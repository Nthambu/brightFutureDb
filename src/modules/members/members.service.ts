import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberPublicDto } from './dto/member-public.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly membersRepo: Repository<Member>,
  ) {}

  // Public: active members only, safe fields only, ordered for display
  async findAllPublic(): Promise<MemberPublicDto[]> {
    const members = await this.membersRepo.find({
      where: { isActive: true },
      order: { displayOrder: 'ASC' },
    });
    return plainToInstance(MemberPublicDto, members, {
      excludeExtraneousValues: true,
    });
  }

  // Admin: everything
  async findAllForAdmin(): Promise<Member[]> {
   const allMembers= await this.membersRepo.find({ order: { displayOrder: 'ASC' } });
   return allMembers;
  }

  async findOne(id: string): Promise<Member> {
    const member = await this.membersRepo.findOne({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Member with id "${id}" not found`);
    }
    return member;
  }

  async create(dto: CreateMemberDto): Promise<Member> {
    const member = this.membersRepo.create(dto);
    return this.membersRepo.save(member);
  }

  async update(id: string, dto: UpdateMemberDto): Promise<Member> {
    const member = await this.findOne(id);
    Object.assign(member, dto);
    return this.membersRepo.save(member);
  }

  async remove(id: string): Promise<void> {
    const result = await this.membersRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Member with id "${id}" not found`);
    }
  }
}
