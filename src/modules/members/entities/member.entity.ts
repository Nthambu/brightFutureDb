import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', length: 100 })
  lastName: string;

  @Column({ length: 50 })
  position: string;

  @Column({
    name: 'member_type',
    length: 30,
    default: 'founding',
  })
  memberType: 'founding' | 'ordinary' | 'honorary';

  @Column('text', { nullable: true })
  bio: string;

  @Column({ name: 'photo_url', type: 'text', nullable: true })
  photoUrl: string;

  @Column({ name: 'term_start_date', type: 'date', nullable: true })
  termStartDate: string;

  @Column({ name: 'term_end_date', type: 'date', nullable: true })
  termEndDate: string;

  @Column({ name: 'display_order', default: 0 })
  displayOrder: number;

  @Index()
  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
