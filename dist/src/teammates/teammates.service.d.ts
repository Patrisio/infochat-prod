import { UserRepository } from '../auth/user.repository';
export declare class TeammatesService {
    private userRepository;
    constructor(userRepository: UserRepository);
    getTeammatesByProjectId(projectId: any): Promise<any[]>;
    addTeammate(teammateDto: any): Promise<{
        code: number;
        status: string;
    }>;
    confirmInvite(inviteDto: any, inviteId: any): Promise<{
        code: number;
        status: string;
    }>;
    deleteTeammate(emailObject: {
        email: string;
    }): Promise<{
        code: number;
        status: string;
    }>;
    updateDialogForAllTeammates(projectId: any, dialogUpdates: any): Promise<{
        code: number;
        status: string;
    }>;
}
