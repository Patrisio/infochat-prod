import CSS from 'csstype';
interface IProps {
    name: string;
    size?: 'small' | 'medium' | 'large';
    stylesList?: CSS.Properties;
}
export default function Avatar({ name, size, stylesList }: IProps): any;
export {};
