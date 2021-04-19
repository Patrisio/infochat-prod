import { Repository } from 'typeorm';
import { Channel } from './channel.entity';
import { ChannelDto } from './dto/channel.dto';
export declare class ChannelRepository extends Repository<Channel> {
    add(channel: ChannelDto, projectId: number): Promise<{
        code: number;
        status: string;
    }>;
    getChannels(projectId: number): Promise<{
        code: number;
        channels: any;
    }>;
}
