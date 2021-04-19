interface Channel {
    name: string;
}
interface Settings {
    chatName: string;
    greeting: string;
    backgroundImage: number;
    buttonLocation: string;
    buttonScale: string;
    buttonText: string;
    infochatLinkEnabled: number;
    customCss: string;
}
interface State {
    channels: Channel[];
    settings: Settings;
    fetching: boolean;
}
export declare const channelsReducer: (state: State, action: any) => any;
export {};
