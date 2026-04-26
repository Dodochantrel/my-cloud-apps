import { Gallery } from 'src/galleries/gallery.entity';
import { Group } from 'src/groups/group.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';

@Entity()
@Tree('closure-table')
export class GalleryCategory {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

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

  @TreeParent({ onDelete: 'CASCADE' })
  parent!: Relation<GalleryCategory | null>;

  @TreeChildren()
  childrens!: Relation<GalleryCategory[]>;

  @OneToMany(() => Gallery, (gallery) => gallery.category)
  galleries!: Relation<Gallery[]>;

  @ManyToOne(() => Group, (group) => group.galleryCategories, { onDelete: 'CASCADE' })
  group!: Relation<Group>;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'SET NULL' })
  user!: Relation<User>;
}
