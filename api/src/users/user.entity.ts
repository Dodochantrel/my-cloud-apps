import { Role } from 'src/roles/role.enum';
import { VideoReview } from 'src/videos/video-review.entity';
import { Group } from 'src/groups/group.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import type { Relation } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  isEmailVerified!: boolean;

  @Column({ nullable: true })
  emailValidKey!: string;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.User],
  })
  roles!: Role[];

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt!: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;

  @OneToMany(() => VideoReview, (review) => review.user)
  videoReviews!: Relation<VideoReview[]>;

  @ManyToMany(() => Group, (group) => group.members)
  memberGroups!: Relation<Group[]>;

  @ManyToMany(() => Group, (group) => group.moderators)
  moderatedGroups!: Relation<Group[]>;

  @OneToMany(() => Group, (group) => group.admin)
  administeredGroups!: Relation<Group[]>;

  constructor(partial: Partial<User> = {}) {
    Object.assign(this, partial);
  }

  prepareEmailRandomCode() {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.emailValidKey = result;
  }
}
