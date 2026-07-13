import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './entities/page.entity';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page)
    private readonly pagesRepo: Repository<Page>,
  ) {}

  // Public: only published pages
  async findAllPublished(): Promise<Partial<Page[]>> {
    return this.pagesRepo.find({
      select:{
          slug: true,
      title: true,
      content: true,
      },
      where: { isPublished: true },
      order: { slug: 'ASC' },
    });

  }

  async findBySlug(slug: string): Promise<Page> {
    const page = await this.pagesRepo.findOne({
      where: { slug, isPublished: true },
    });
    if (!page) {
      throw new NotFoundException(`Page with slug "${slug}" not found`);
    }
    return page;
  }

  // Admin: all pages regardless of publish state
  async findAllForAdmin(): Promise<Page[]> {
    return this.pagesRepo.find({ order: { slug: 'ASC' } });
  }

  async create(dto: CreatePageDto): Promise<Page> {
    const page = this.pagesRepo.create(dto);
    return this.pagesRepo.save(page);
  }

  async update(id: string, dto: UpdatePageDto): Promise<Page> {
    const page = await this.pagesRepo.findOne({ where: { id } });
    if (!page) {
      throw new NotFoundException(`Page with id "${id}" not found`);
    }
    Object.assign(page, dto);
    return this.pagesRepo.save(page);
  }

  async remove(id: string): Promise<void> {
    const result = await this.pagesRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Page with id "${id}" not found`);
    }
  }
}
