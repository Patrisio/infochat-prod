import React from 'react';
interface IProps {
    title?: string | React.ReactNode;
    listItems: any;
    mode?: 'light' | 'dark';
}
export default function SidebarList({ title, listItems, mode }: IProps): any;
export {};
