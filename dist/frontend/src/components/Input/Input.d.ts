import React from 'react';
interface IData {
    id?: string;
    icon?: string;
    value: string;
}
interface IInputProps {
    placeholder?: string;
    value?: string;
    type: string;
    name?: string;
    onChange?: (e: any) => void;
    onClick?: (item: {
        icon?: string;
        value: string;
    }) => void;
    onSelect?: (arg0: string) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    fluid?: boolean;
    width?: string;
    classNames?: string;
    data?: IData[];
    fixedSelect?: boolean;
    allowClear?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    addonAfter?: React.ReactNode;
    maxLength?: number;
}
export default function Input({ placeholder, value, type, name, fluid, width, classNames, onChange, onClick, onSelect, onBlur, onFocus, data, fixedSelect, allowClear, readOnly, disabled, addonAfter, maxLength, }: IInputProps): any;
export {};
