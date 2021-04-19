import { BaseEntity } from 'typeorm';
import { Project } from '../auth/projects.entity';
export declare class Channel extends BaseEntity {
    id: number;
    name: string;
    status: string;
    project: Project;
}
