import { Event } from 'src/events/event.entity';
import { GalleryCategory } from 'src/galleries-categories/gallery-category.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @ManyToMany(() => User, (user) => user.memberGroups)
  @JoinTable()
  members!: Relation<User[]>;

  @ManyToMany(() => User, (user) => user.moderatedGroups)
  @JoinTable()
  moderators!: Relation<User[]>;

  @ManyToOne(() => User, (user) => user.administeredGroups, { nullable: false })
  admin!: Relation<User>;

  get allMembers(): User[] {
    const map = new Map<string, User>();
    if (this.admin) {
      map.set(this.admin.id, this.admin);
    }
    for (const mod of this.moderators ?? []) {
      map.set(mod.id, mod);
    }
    for (const member of this.members ?? []) {
      map.set(member.id, member);
    }
    return Array.from(map.values());
  }

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

  @ManyToOne(() => User, { nullable: false })
  createdBy!: Relation<User>;

  @ManyToOne(() => User, { nullable: true })
  updatedBy!: Relation<User>;

  @ManyToMany(() => Event, (event) => event.groups)
  @JoinTable()
  events!: Relation<Event[]>;

  @ManyToMany(() => GalleryCategory, (category) => category.groups)
  @JoinTable()
  galleryCategories!: Relation<GalleryCategory[]>;

  constructor(partial: Partial<Group>) {
    Object.assign(this, partial);
  }
}
