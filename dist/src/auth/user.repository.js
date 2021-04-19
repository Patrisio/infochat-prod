"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const projects_entity_1 = require("./projects.entity");
const bcrypt = require("bcrypt");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async signUp(authCredentialsDto) {
        const { username, phone, email, password, role, status } = authCredentialsDto;
        const user = new user_entity_1.User();
        const project = new projects_entity_1.Project();
        user.username = username;
        user.phone = phone;
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        user.role = role;
        user.status = status;
        try {
            project.name = 'project_name333';
            const projectData = await project.save();
            user.project_id = projectData.id;
            await user.save();
            project.users = [user];
            await project.save();
            return {
                code: 200,
                status: 'success',
                projectId: String(projectData.id)
            };
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('User with this email already exist');
            }
            else {
                console.log(error);
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async validateUserPassword(loginCredentialsDto) {
        const { email, password } = loginCredentialsDto;
        const user = await this.findOne({ email });
        if (user && await user.validatePassword(password)) {
            return {
                projectId: user.project_id,
                email: user.email
            };
        }
        else {
            return null;
        }
    }
    async getTeammatesByProjectId(projectId) {
        const projectRepository = await typeorm_1.getConnection().getRepository(projects_entity_1.Project);
        const projects = await projectRepository.find({ relations: ["users"] });
        const project = projects.find((project) => project.id === parseInt(projectId));
        console.log(project);
        const teammates = project.users;
        const formattedTeammates = [];
        for (let { id, username, email, status, role, all_client_ids, unread_count, unread_client_ids, assigned_count, assigned_client_ids, opened_count, opened_client_ids } of teammates) {
            const operator = {
                id, username, email, status, role,
                all_client_ids, unread_count, unread_client_ids,
                assigned_count, assigned_client_ids,
                opened_count, opened_client_ids
            };
            formattedTeammates.push(operator);
        }
        return formattedTeammates;
    }
    async addTeammate(teammateDto) {
        const { inviteId, projectId, email, role, status, username } = teammateDto;
        const user = new user_entity_1.User();
        const projectRepository = await typeorm_1.getConnection().getRepository(projects_entity_1.Project);
        const projects = await projectRepository.find({ relations: ["users"] });
        const project = projects.find((project) => project.id === parseInt(projectId));
        user.invite_id = inviteId;
        user.project_id = parseInt(projectId);
        user.email = email;
        user.role = role;
        user.status = status;
        user.username = username;
        try {
            await user.save();
            project.users = [...project.users, user];
            project.save();
            return {
                code: 200,
                status: 'success'
            };
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('User with this email already exist');
            }
            else {
                console.log(error);
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async updateTeammateByInviteId(inviteDto, email) {
        const { username, password, projectId } = inviteDto;
        const projectRepository = await typeorm_1.getConnection().getRepository(projects_entity_1.Project);
        const projects = await projectRepository.find({ relations: ["users"] });
        const project = projects.find((project) => project.id === parseInt(projectId));
        const user = await this.findOne({ project_id: parseInt(projectId), email });
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        user.username = username;
        user.status = 'active';
        try {
            await user.save();
            project.users = [...project.users, user];
            project.save();
            return {
                code: 200,
                status: 'success'
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteTeammate(email) {
        const result = await this.delete({ email });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Teammate with email "${email}" not found`);
        }
        return {
            code: 200,
            status: 'success'
        };
    }
    async getCurrentUser(email) {
        const { all_client_ids, unread_count, unread_client_ids, assigned_count, assigned_client_ids, opened_count, opened_client_ids, username, phone, role, status, closed_count, closed_client_ids } = await this.findOne({ email });
        return {
            allClientIds: all_client_ids,
            unreadCount: unread_count,
            unreadClientIds: unread_client_ids,
            assignedCount: assigned_count,
            assignedClientIds: assigned_client_ids,
            openedCount: opened_count,
            openedClientIds: opened_client_ids,
            closedCount: closed_count,
            closedClientIds: closed_client_ids,
            username,
            phone,
            role,
            status,
            email
        };
    }
    async updateDialogForAllTeammates(projectId, dialogUpdates) {
        try {
            await typeorm_1.getConnection()
                .createQueryBuilder()
                .update(user_entity_1.User)
                .set({
                unread_count: dialogUpdates.unreadCount,
                unread_client_ids: dialogUpdates.unreadClientIds
            })
                .where("project_id = :project_id", { project_id: parseInt(projectId) })
                .execute();
            return {
                code: 200,
                status: 'success'
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateOpenedDialogForAllTeammates(projectId, dialogUpdates) {
        try {
            await typeorm_1.getConnection()
                .createQueryBuilder()
                .update(user_entity_1.User)
                .set({
                opened_count: dialogUpdates.openedCount,
                opened_client_ids: dialogUpdates.openedClientIds
            })
                .where("project_id = :project_id", { project_id: parseInt(projectId) })
                .execute();
            return {
                code: 200,
                status: 'success'
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateAssignedUserByEmail(assignedDto) {
        const { email, assignedClientIds, assignedCount } = assignedDto;
        try {
            await typeorm_1.getConnection()
                .createQueryBuilder()
                .update(user_entity_1.User)
                .set({
                assigned_count: assignedCount,
                assigned_client_ids: assignedClientIds
            })
                .where("email = :email", { email })
                .execute();
            return {
                code: 200,
                status: 'success'
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateClosedUserByEmail(assignedDto) {
        const { email, closedClientIds, closedCount } = assignedDto;
        try {
            await typeorm_1.getConnection()
                .createQueryBuilder()
                .update(user_entity_1.User)
                .set({
                closed_count: closedCount,
                closed_client_ids: closedClientIds
            })
                .where("email = :email", { email })
                .execute();
            return {
                code: 200,
                status: 'success'
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
    between(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map