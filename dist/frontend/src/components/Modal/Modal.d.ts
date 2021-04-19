import React from 'react';
interface Props {
    show: boolean;
    onClose: () => void;
    title?: string;
    body: React.ReactNode | null;
    footer?: React.ReactNode | null;
    width?: string;
    height?: string;
    position?: 'center' | 'top';
}
export default function Modal({ show, onClose, title, body, footer, width, height, position }: Props): any;
export {};
