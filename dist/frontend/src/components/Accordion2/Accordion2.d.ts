import React from 'react';
import Panel from './components/Panel/Panel';
interface Panel {
    imageSrc: string;
    label: string;
    content: React.ReactElement;
}
interface Props {
    panels: Panel[];
}
export default function Accordion({ panels }: Props): any;
export {};
