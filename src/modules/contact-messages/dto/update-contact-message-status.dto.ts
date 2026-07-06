import { IsIn } from 'class-validator';

export class UpdateContactMessageStatusDto {
  @IsIn(['new', 'read', 'responded', 'archived'])
  status: 'new' | 'read' | 'responded' | 'archived';
}
