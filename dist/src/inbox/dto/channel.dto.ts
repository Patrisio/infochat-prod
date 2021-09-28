import { IsString } from 'class-validator';

export class ChannelDto {
  @IsString()
  name: string;

  @IsString()
  status?: string
}