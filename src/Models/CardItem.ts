interface CardItem {
    color?: string;
    title: string;
    description: string;
    time: string;
    icon?: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    type?: string;
    clickable?: boolean;
    size?: string;
}

export type { CardItem };