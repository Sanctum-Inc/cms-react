interface KeyParties {
  label: string;
  name: string;
  value: string;
  icon: React.ForwardRefExoticComponent<
    Omit<import("lucide-react").LucideProps, "ref"> &
      React.RefAttributes<SVGSVGElement>
  >;
  type: string;
  color: string;
}

export type { KeyParties };
