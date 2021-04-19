import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { InviteDto } from '../auth/dto/invite.dto';
import { TeammateDto } from '../teammates/dto/teammate.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<{
        code: number;
        status: string;
    }>;
    signIn(loginCredentialsDto: LoginCredentialsDto): Promise<{
        accessToken: string;
        projectId: number;
    }>;
    sendEmail(teammateDto: TeammateDto): Promise<void>;
    confirmInvite(inviteId: any, inviteDto: InviteDto): Promise<{
        code: number;
        status: string;
    }>;
    getCurrentUser(headers: any): Promise<{
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
}
