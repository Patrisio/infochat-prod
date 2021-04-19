import React from 'react';
import CSS from 'csstype';
interface IButtonProps {
    children: React.ReactNode;
    type: 'submit' | 'reset' | 'button';
    fluid?: boolean;
    size?: string;
    background?: string;
    onClick?: () => void;
    stylesList?: CSS.Properties | undefined;
    disabled?: boolean;
}
export default function Button({ children, type, fluid, size, background, onClick, stylesList, disabled }: IButtonProps): any;
export {};
