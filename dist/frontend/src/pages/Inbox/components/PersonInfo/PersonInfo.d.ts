interface IMessagesHistory {
    message: string;
    clientId: string;
    username: string;
}
interface IIncomingMessage {
    id: string;
    projectId: string;
    clientId: string;
    messagesHistory: IMessagesHistory[];
    assigned_to: string | null;
    avatarName: string;
    avatarColor: string;
    email: string;
    phone: string;
}
interface IProps {
    selectedClient: IIncomingMessage;
}
export default function PersonInfo({ selectedClient }: IProps): any;
export {};
