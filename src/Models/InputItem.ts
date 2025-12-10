interface InputItem {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  valueArray?: string[];
  icon?: React.ForwardRefExoticComponent<
    Omit<import("lucide-react").LucideProps, "ref"> &
      React.RefAttributes<SVGSVGElement>
  >;
  addEnterHint?: boolean;
  width?: string;
  height?: string;
  inputType: "input" | "select" | "file";
  selectOptions?: KeyValue[];
}

interface KeyValue{
  key: string;
  value: string;
}

export type { InputItem, KeyValue };