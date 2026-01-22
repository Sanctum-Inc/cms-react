import { Plus, type LucideProps } from "lucide-react";
import {
  useState,
  type ChangeEvent,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";
import type { KeyValue } from "../../Models/InputItem";

type PillInputChangeEvent = {
  target: {
    name: string;
    value: string[];
  };
};

interface PillInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  addEnterHint?: boolean;
  width?: string;
  height?: string;
  inputType: "input" | "select" | "file";
  selectOptions?: KeyValue[];
  customOnChange?: (e: PillInputChangeEvent) => void;
  error?: boolean;
  disabled?: boolean;
}

const PillInput = (props: PillInputProps) => {
  const [getValues, setValues] = useState<string[]>([]);
  const [getFiles, setFiles] = useState<File[]>([]);

  const {
    label,
    icon,
    addEnterHint,
    width,
    height,
    inputType,
    selectOptions,
    customOnChange,
    error,
    className,
    disabled,
    ...restProps
  } = props;

  // Controlled value support
  const inputValue = props.value !== undefined ? String(props.value) : "";

  // Shared disabled styles
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

  const handleSetValues = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (props.onChange) {
      props.onChange(e);
    }

    if (customOnChange) {
      customOnChange({
        target: {
          name: props.name!,
          value: [e.target.value],
        },
      });
    }
  };

  const handleSetValuesSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (disabled) return;

    if (props.onChange) {
      props.onChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleFileOpen = () => {
    if (disabled) return;
    const input = document.getElementById("hidden-file-input");
    input?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const files = e.target.files ? Array.from(e.target.files) : [];

    files.forEach((file) => {
      const updated = [...getValues, file.name];
      setValues(updated);
      setFiles((prev) => [...prev, file]);

      customOnChange?.({
        target: {
          name: props.name!,
          value: updated,
        },
      });
    });

    console.log(getFiles);
  };

  const renderInput = () => {
    switch (inputType) {
      case "input":
        return (
          <input
            {...restProps}
            disabled={disabled}
            value={inputValue}
            onKeyDown={handleEnterKey}
            onChange={handleSetValues}
            className={`border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-full py-1 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500
            ${className ?? ""}
            ${icon ? "pr-10" : ""}
            ${width ? "w-" + width : "w-full"}
            ${height ? "h-" + height : "h-13"}
            ${disabledStyles}`}
          />
        );

      case "select":
        return (
          <select
            disabled={disabled}
            value={inputValue}
            onChange={handleSetValuesSelect}
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
            {selectOptions?.map((option) => (
              <option key={option.key} value={option.key}>
                {option.value}
              </option>
            ))}
          </select>
        );

      case "file":
        return (
          <>
            <div
              className={`border-2 border-dashed h-50 flex items-center justify-center
              ${
                disabled
                  ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 hover:border-blue-500 hover:text-blue-500 cursor-pointer"
              }`}
              onClick={handleFileOpen}
            >
              <Plus size={72} />
            </div>
            <input
              type="file"
              name={props.name}
              id="hidden-file-input"
              hidden
              multiple
              onChange={handleFileChange}
            />
          </>
        );

      default:
        return null;
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
        {renderInput()}
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
