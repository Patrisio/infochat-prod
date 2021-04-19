interface Props {
    value?: string;
    className?: string;
    onChange?: (e: any) => void;
    maxLength?: number;
    disabled?: boolean;
}
export default function Textarea({ value, className, onChange, maxLength, disabled }: Props): any;
export {};
