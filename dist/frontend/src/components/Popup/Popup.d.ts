import React from 'react';
interface IProps {
    children: React.ReactNode;
    body: React.ReactNode;
    width?: string;
    center?: boolean;
    onClick?: () => void;
}
export default function Popup({ children, width, body, center, onClick }: IProps): any;
export {};
