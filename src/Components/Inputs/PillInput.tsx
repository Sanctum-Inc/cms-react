import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

interface PillInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
    icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

const PillInput = (props: PillInputProps) => {
  return (
    <div className="flex flex-col w-full mt-3">
      {props.label && <label htmlFor={props.name} className="mb-1">{props.label}</label>}
      <input {...props} className={`border border-gray-300 rounded-full py-1 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 ${props.className}`} />
      <div>
        {props.icon && <props.icon />}
      </div>
    </div>
  );
}

export default PillInput;