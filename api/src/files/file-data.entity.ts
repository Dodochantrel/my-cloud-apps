import { User } from "src/users/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import type { Relation } from "typeorm";


@Entity()
export class FileData {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  path!: string;

  @Column()
  mimetype!: string;

  @Column()
  size!: number;

  @ManyToOne(() => User, (user) => user.filesData)
  user!: Relation<User>;

  constructor(partial: Partial<FileData>) {
    Object.assign(this, partial);
  }

  prepareFileName() {
    this.name = `${new Date().getTime()}`;
  }
}
