import {
  useState,
  type ChangeEvent,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";
import type { LucideProps } from "lucide-react";

interface PillTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  addEnterHint?: boolean;
  width?: string;
  height?: string;
  error?: boolean;
  disabled?: boolean;
}

const PillTextarea = (props: PillTextareaProps) => {
  const [values, setValues] = useState<string[]>([]);

  const {
    label,
    icon,
    addEnterHint,
    width,
    height,
    error,
    className,
    disabled,
    onChange,
    ...restProps
  } = props;

  const value = props.value ?? "";

  const disabledStyles = disabled
    ? "bg-gray-100 text-gray-500 cursor-not-allowed opacity-70 focus:ring-0"
    : "";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!addEnterHint || disabled) return;
    if (e.key !== "Enter") return;

    e.preventDefault();

    const trimmed = String(value).trim();
    if (!trimmed) return;

    setValues((prev) => [...prev, trimmed]);

    // clear textarea after add
    if (onChange) {
      onChange({
        ...e,
        target: { ...e.target, value: "" },
      } as unknown as ChangeEvent<HTMLTextAreaElement>);
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
        <textarea
          {...restProps}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          className={`border resize-none ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-2xl py-2 px-4 focus:outline-none focus:ring-1 focus:ring-blue-500
            ${className ?? ""}
            ${width ? `w-${width}` : "w-full"}
            ${height ? `h-${height}` : "h-24"}
            ${disabledStyles}`}
        />

        {icon && addEnterHint && !disabled && (() => {
          const Icon = icon;
          return (
            <span className="absolute right-3 top-3 text-gray-500 pointer-events-none">
              <Icon size={16} />
            </span>
          );
        })()}
      </div>

      {values.length > 0 && (
        <div className="flex flex-wrap mt-2 gap-2">
          {values.map((val, index) => (
            <div
              key={index}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center"
            >
              <span>{val}</span>
              {!disabled && (
                <button
                  type="button"
                  className="ml-2 hover:text-red-600"
                  onClick={() =>
                    setValues((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  ×
                </button>
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

export default PillTextarea;
