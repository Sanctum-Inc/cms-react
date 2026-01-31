import {
  type ChangeEvent,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";
import type { LucideProps } from "lucide-react";
import type { KeyValue } from "../../Models/InputItem";

interface PillSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  className?: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  width?: string;
  height?: string;
  selectOptions?: KeyValue[];
  customOnChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  error?: boolean;
  disabled?: boolean;
}

const PillSelect = (props: PillSelectProps) => {
  const {
    label,
    icon,
    width,
    height,
    selectOptions = [],
    customOnChange,
    error,
    className,
    disabled,
    value,
    ...restProps
  } = props;

  // Controlled value support
  const inputValue = value !== undefined ? String(value) : "";

  const disabledStyles = disabled
    ? "bg-gray-100 text-gray-500 cursor-not-allowed opacity-70 focus:ring-0 focus:outline-none"
    : "";

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (disabled) return;

    if (props.onChange) {
      props.onChange(e);
    }
    if (customOnChange) {
      customOnChange(e);
    }
  };

  return (
    <div className="flex flex-col w-full mt-3">
      {label && (
        <label
          htmlFor={props.name}
          className={`mb-1 ml-3.5 ${disabled ? "text-gray-400" : ""}`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          {...restProps}
          disabled={disabled}
          value={inputValue}
          onChange={handleChange}
          className={`border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-full py-1 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500
            ${className ?? ""}
            ${icon ? "pr-10" : ""}
            ${width ? "w-" + width : "w-full"}
            ${height ? "h-" + height : "h-13"}
            ${disabledStyles}`}
        >
          <option disabled value="">
            Select an option
          </option>
          {selectOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.value}
            </option>
          ))}
        </select>
        {icon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            {icon && (() => {
              const Icon = icon;
              return <Icon size={16} />;
            })()}
          </span>
        )}
      </div>
    </div>
  );
};

export default PillSelect;
