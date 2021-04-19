import { Component } from 'react';
declare type IProps = {
    name?: string;
    color?: string;
    size?: string;
    rounded?: boolean;
    square?: boolean;
    circle?: boolean;
    dance?: boolean;
    classNames?: string;
};
export default class Animal extends Component<IProps> {
    validateName(): {
        animal: string;
        translate: string;
    };
    getAvatar(avatarName: string): any;
    validateColor(): {
        color: string;
        translate: string;
    };
    validateSize(): any;
    borderRadius(): "10%" | "0px" | "50%";
    render(): any;
}
export {};
