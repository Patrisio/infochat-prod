interface Props {
    hasChanges: Boolean;
    toggleChanges: (bool: boolean) => void;
    setActiveTab?: (index: number) => void;
    resetBlockSettings: () => void;
}
export default function ButtonsGroup({ hasChanges, toggleChanges, setActiveTab, resetBlockSettings }: Props): any;
export {};
