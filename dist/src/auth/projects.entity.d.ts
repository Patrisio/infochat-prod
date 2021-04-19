import { BaseEntity } from 'typeorm';
import { Channel } from '../inbox/channel.entity';
import { User } from '../auth/user.entity';
export declare class Project extends BaseEntity {
    id: number;
    name: string;
    channels: Channel[];
    users: User[];
}
