import React from 'react';
import CSS from 'csstype';
interface IProps {
    name?: string;
    count?: number;
    icon?: React.ReactNode;
    onClick?: () => void;
    stylesList?: CSS.Properties | undefined;
    mode?: 'light' | 'dark';
}
export default function SidebarList({ name, count, icon, onClick, stylesList, mode }: IProps): any;
export {};
