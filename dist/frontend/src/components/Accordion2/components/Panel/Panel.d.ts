import React from 'react';
interface Props {
    imageSrc: string;
    label: string;
    content: React.ReactNode;
    activeTab: number;
    index: number;
    activateTab: () => void;
}
export default function Panel({ imageSrc, label, content, activeTab, index, activateTab }: Props): any;
export {};
