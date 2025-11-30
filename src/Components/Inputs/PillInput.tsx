import { Plus, type LucideProps } from "lucide-react";
import {
  useState,
  type ChangeEvent,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";

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
  selectOptions?: string[];
  customOnChange?: (e: PillInputChangeEvent) => void;
  error?: boolean;
}

const PillInput = (props: PillInputProps) => {
  const [getValues, setValues] = useState<string[]>([]);
  const [getFiles, setFiles] = useState<File[]>([]);

  // Use props.value if provided (controlled), otherwise use internal state
  const inputValue = props.value !== undefined ? String(props.value) : "";

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return; // Ignore non-Enter keys
    if (!props.addEnterHint) return; // Only run if allowed

    e.preventDefault(); // Prevent form submit / blur

    if (inputValue.trim() === "") return; // Ignore empty input

    // Clear input field after adding 
    setValues((prev) => [...prev, inputValue]);

    if (props.onChange) {
      props.onChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleSetValues = (e: ChangeEvent<HTMLInputElement>) => {
    // For regular input mode, just pass through to parent's onChange
    if (props.onChange) {
      props.onChange(e);
    }

    if (customOnChange) {
      // Pass as array with one element for consistency
      customOnChange({
        target: {
          name: props.name!,
          value: [e.target.value],
        },
      });
    }
  };

  const handleSetValuesSelect = (e: ChangeEvent<HTMLSelectElement>) => {

    if (props.onChange) {
      props.onChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleFileOpen = () => {
    const input = document.getElementById("hidden-file-input");
    input?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    files.forEach((file) => {
      const updated = [...getValues, file.name];
      setValues(updated);
      setFiles((prev) => [...prev, file]);

      props.customOnChange?.({
        target: {
          name: props.name!,
          value: updated,
        },
      });
    });

    console.log(getFiles);
  };

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
    ...restProps
  } = props;

  const renderInput = (inputType: "input" | "select" | "file") => {
    switch (inputType) {
      case "input":
        return (
          <input
            {...restProps}
            className={`border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-full py-1 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              className ?? ""
            } ${icon ? "pr-10" : ""} ${
              width ? "w-" + width : "w-full"
            } ${height ? "h-" + height : "h-13"}`}
            onKeyDown={handleEnterKey}
            onChange={handleSetValues}
            value={inputValue}
          />
        );
      case "select":
        return (
          <select
            className={`border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-full py-1 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              className ?? ""
            } ${icon ? "pr-10" : ""} ${
              width ? "w-" + width : "w-full"
            } ${height ? "h-" + height : "h-13"}`}
            value={inputValue}
            onChange={handleSetValuesSelect}
          >
            {selectOptions?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "file":
        return (
          <>
            <div
              className="border-2 border-dashed border-gray-300 h-50 hover:border-blue-500 flex items-center justify-center hover:text-blue-500 cursor-pointer"
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
              onChange={(e) => {
                handleFileChange(e);
              }}
            />
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="flex flex-col w-full mt-3">
      {label && (
        <label htmlFor={name} className="mb-1 ml-3.5">
          {label}
        </label>
      )}
      <div className="relative">
        {renderInput(inputType)}
        {props.icon && addEnterHint && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none hover:text-orange-700 cursor-pointer">
            <props.icon size={16} />
          </span>
        )}
      </div>
      {getValues.length > 0 && (
        <div className="flex flex-wrap mt-2 gap-2">
          {getValues.map((val, index) => (
            <div
              key={index}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center "
            >
              <span>{val}</span>
              <span
                className="ml-2 cursor-pointer hover:text-red-600"
                onClick={() =>
                  setValues(getValues.filter((_, i) => i !== index))
                }
              >
                x
              </span>
            </div>
          ))}
        </div>
      )}
      {addEnterHint && (
        <div className="text-xs text-gray-400 mt-1">Press Enter to add</div>
      )}
    </div>
  );
};

export default PillInput;
