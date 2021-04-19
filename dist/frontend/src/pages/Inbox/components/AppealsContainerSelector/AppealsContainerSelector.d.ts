import 'moment/locale/ru';
declare type IMessagesHistory = {
    message: string;
    clientId: string;
    username: string;
    timestamp: number;
};
declare type IIncomingMessage = {
    projectId: string;
    clientId: string;
    messagesHistory: IMessagesHistory[];
    avatarName: string;
    avatarColor: string;
    assigned_to: string | null;
};
interface AppealsContainerSelectorProps {
    messages: IIncomingMessage[];
}
export default function AppealsContainerSelector({ messages }: AppealsContainerSelectorProps): any;
export {};
