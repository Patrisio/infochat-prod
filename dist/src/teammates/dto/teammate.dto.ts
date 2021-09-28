import { IsString } from 'class-validator';

export class TeammateDto {
  @IsString()
  inviteId: string;

  @IsString()
  email: string;

  @IsString()
  projectId: string;

  @IsString()
  role: string;

  @IsString()
  status: string;

  @IsString()
  username: string;
}