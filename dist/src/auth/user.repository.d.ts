import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { User } from './user.entity';
export declare class UserRepository extends Repository<User> {
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<{
        code: number;
        status: string;
        projectId: string;
    }>;
    validateUserPassword(loginCredentialsDto: LoginCredentialsDto): Promise<{
        projectId: number;
        email: string;
    }>;
    getTeammatesByProjectId(projectId: any): Promise<any[]>;
    addTeammate(teammateDto: any): Promise<{
        code: number;
        status: string;
    }>;
    updateTeammateByInviteId(inviteDto: any, email: any): Promise<{
        code: number;
        status: string;
    }>;
    deleteTeammate(email: string): Promise<{
        code: number;
        status: string;
    }>;
    getCurrentUser(email: string): Promise<{
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
    updateDialogForAllTeammates(projectId: any, dialogUpdates: any): Promise<{
        code: number;
        status: string;
    }>;
    updateOpenedDialogForAllTeammates(projectId: any, dialogUpdates: any): Promise<{
        code: number;
        status: string;
    }>;
    updateAssignedUserByEmail(assignedDto: any): Promise<{
        code: number;
        status: string;
    }>;
    updateClosedUserByEmail(assignedDto: any): Promise<{
        code: number;
        status: string;
    }>;
    private hashPassword;
    private between;
}
