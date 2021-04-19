import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, ManyToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Project } from './projects.entity';

type IClient = {
  projectId: string,
  clientId: string,
  messagesHistory: IMessagesHistory[],
}

type IMessagesHistory = {
  clientId: string,
  username: string,
  message: string
}

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToMany(type => Project, project =>project.users)
  projects: Project[];

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  salt: string;

  @Column()
  project_id: number;

  @Column({ nullable: true })
  invite_id: string;

  @Column()
  role: string;

  @Column()
  status: string;

  @Column({ default: 0 })
  all_count: number;

  @Column("jsonb", {
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  all_client_ids: IClient[];

  @Column({ default: 0 })
  unread_count: number;

  @Column("jsonb", {
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  unread_client_ids: IClient[];

  @Column({ default: 0 })
  opened_count: number;

  @Column("jsonb", {
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  opened_client_ids: IClient[];

  @Column({ default: 0 })
  assigned_count: number;

  @Column("jsonb", {
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  assigned_client_ids: IClient[];

  @Column({ default: 0 })
  closed_count: number;

  @Column("jsonb", {
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  closed_client_ids: IClient[];

  async validatePassword(password: string): Promise<Boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

// @Column("text", { array: true, default: "{}" })
// closed_client_ids: string[];