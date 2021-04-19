import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { UserRepository } from './user.repository';
import { MailerService } from '@nestjs-modules/mailer';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private readonly mailerService;
    constructor(userRepository: UserRepository, jwtService: JwtService, mailerService: MailerService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<{
        code: number;
        status: string;
    }>;
    signIn(loginCredentialsDto: LoginCredentialsDto): Promise<{
        accessToken: string;
        projectId: number;
    }>;
    confirmInvite(inviteDto: any, inviteId: any): Promise<{
        code: number;
        status: string;
    }>;
    getCurrentUser(accessToken: any): Promise<{
        allClientIds: {
            projectId: string;
            clientId: string;
            messagesHistory: {
                clientId: string;
                username: string;
                message: string;
            }[];
        }[];
        unreadCount: number;
        unreadClientIds: {
            projectId: string;
            clientId: string;
            messagesHistory: {
                clientId: string;
                username: string;
                message: string;
            }[];
        }[];
        assignedCount: number;
        assignedClientIds: {
            projectId: string;
            clientId: string;
            messagesHistory: {
                clientId: string;
                username: string;
                message: string;
            }[];
        }[];
        openedCount: number;
        openedClientIds: {
            projectId: string;
            clientId: string;
            messagesHistory: {
                clientId: string;
                username: string;
                message: string;
            }[];
        }[];
        closedCount: number;
        closedClientIds: {
            projectId: string;
            clientId: string;
            messagesHistory: {
                clientId: string;
                username: string;
                message: string;
            }[];
        }[];
        username: string;
        phone: string;
        role: string;
        status: string;
        email: string;
    }>;
    sendEmail(teammateDto: any): Promise<void>;
}
