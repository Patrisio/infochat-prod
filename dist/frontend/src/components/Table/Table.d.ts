import Row from './components/Row';
interface Row {
    [key: string]: string;
}
interface Props {
    data: Row[];
    columns: any;
}
export default function Table({ columns, data }: Props): any;
export {};
