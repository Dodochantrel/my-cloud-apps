import { FileData } from 'src/files/file-data.entity';
import { GalleryCategory } from 'src/galleries-categories/gallery-category.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'boolean', default: false })
  isPrivate!: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt!: Date;

  @OneToOne(() => FileData, { cascade: true, eager: true })
  @JoinColumn()
  fileData!: Relation<FileData>;

  @ManyToOne(() => GalleryCategory, (category) => category.id, {
    onDelete: 'CASCADE',
  })
  category!: Relation<GalleryCategory>;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user!: Relation<User>;

  constructor(partial: Partial<Gallery>) {
    Object.assign(this, partial);
  }
}
