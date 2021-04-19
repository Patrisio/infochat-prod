import { TeammatesService } from './teammates.service';
import { TeammateDto } from './dto/teammate.dto';
export declare class TeammatesController {
    private teammatesService;
    constructor(teammatesService: TeammatesService);
    getTeammatesByProjectId(projectId: any): Promise<any[]>;
    addTeammate(teammateDto: TeammateDto): Promise<{
        code: number;
        status: string;
    }>;
    updateDialogForAllTeammates(projectId: string, dialogUpdates: any): Promise<{
        code: number;
        status: string;
    }>;
    deleteTeammate(emailObject: any): Promise<{
        code: number;
        status: string;
    }>;
}
