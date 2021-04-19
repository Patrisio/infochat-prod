interface Teammate {
    avatar: string;
    email: string;
    role: string;
    status: string;
    username: string;
}
interface State {
    teammates: Teammate[];
}
export declare const teammatesReducer: (state: State, action: any) => {
    teammates: any;
};
export {};
