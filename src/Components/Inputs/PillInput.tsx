import {
  useState,
  type ChangeEvent,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";
import type { LucideProps } from "lucide-react";

interface PillInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  addEnterHint?: boolean;
  width?: string;
  height?: string;
  customOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  disabled?: boolean;
}

const PillInput = (props: PillInputProps) => {
  const [getValues, setValues] = useState<string[]>([]);

  const {
    label,
    icon,
    addEnterHint,
    width,
    height,
    customOnChange,
    error,
    className,
    disabled,
    ...restProps
  } = props;

  // Controlled value support
  const inputValue = props.value !== undefined ? String(props.value) : "";

  const disabledStyles = disabled
    ? "bg-gray-100 text-gray-500 cursor-not-allowed opacity-70 focus:ring-0 focus:outline-none"
    : "";

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.key !== "Enter") return;
    if (!addEnterHint) return;

    e.preventDefault();
    if (inputValue.trim() === "") return;

    setValues((prev) => [...prev, inputValue]);

    if (props.onChange) {
      props.onChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        <input
          {...restProps}
          disabled={disabled}
          value={inputValue}
          onKeyDown={handleEnterKey}
          onChange={handleChange}
          className={`border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-full py-1 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500
            ${className ?? ""}
            ${icon ? "pr-10" : ""}
            ${width ? "w-" + width : "w-full"}
            ${height ? "h-" + height : "h-13"}
            ${disabledStyles}`}
        />
        {icon && addEnterHint && !disabled && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            {props.icon && <props.icon size={16} />}
          </span>
        )}
      </div>

      {getValues.length > 0 && (
        <div className="flex flex-wrap mt-2 gap-2">
          {getValues.map((val, index) => (
            <div
              key={index}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center"
            >
              <span>{val}</span>
              {!disabled && (
                <span
                  className="ml-2 cursor-pointer hover:text-red-600"
                  onClick={() =>
                    setValues(getValues.filter((_, i) => i !== index))
                  }
                >
                  x
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {addEnterHint && !disabled && (
        <div className="text-xs text-gray-400 mt-1">Press Enter to add</div>
      )}
    </div>
  );
};

export default PillInput;
