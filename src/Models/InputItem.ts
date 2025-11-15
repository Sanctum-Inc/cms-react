interface InputItem {
    label?: string;
    name: string;
    type: string;
    placeholder?: string;
    value?: string;
    icon?: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    addEnterHint?: boolean;
}

export type { InputItem };