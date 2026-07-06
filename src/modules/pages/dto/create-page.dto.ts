import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePageDto {
  @IsString()
  @MaxLength(50)
  slug: string;

  @IsString()
  @MaxLength(200)
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
