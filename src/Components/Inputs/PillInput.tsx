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

interface PillInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
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
  onChange?: (e: PillInputChangeEvent) => void;
}

const PillInput = (props: PillInputProps) => {
  const [getValues, setValues] = useState<string[]>([]);
  const [getFiles, setFiles] = useState<File[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && props.addEnterHint) {
      setValues((prev) => {
        const updated = [...prev, inputValue];

        props.onChange?.({
          target: {
            name: props.name!,
            value: updated,
          },
        });

        return updated;
      });

      setInputValue("");
    }

    if (e.key === "Enter" && props.onKeyDown) {
      props.onKeyDown(e);
    }
  };

  const handleSetValues = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (props.onChange) {
      // Pass as array with one element for consistency
      props.onChange({
        target: {
          name: props.name!,
          value: [e.target.value],
        },
      });
    }
  };

  const handleSetValuesSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;

    setValues((prev) => {
      const updated = [...prev, newValue];

      props.onChange?.({
        target: {
          name: props.name!,
          value: updated,
        },
      });

      return updated;
    });

    setInputValue(newValue);
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

      props.onChange?.({
        target: {
          name: props.name!,
          value: updated,
        },
      });
    });

    console.log(getFiles);
  };

  const renderInput = (inputType: "input" | "select" | "file") => {
    switch (inputType) {
      case "input":
        return (
          <input
            {...{
              ...props,
              value: undefined,
              onChange: undefined,
              height: undefined,
              width: undefined,
            }}
            className={`border border-gray-300 rounded-full py-1 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              props.className ?? ""
            } ${props.icon ? "pr-10" : ""} ${
              props.width ? "w-" + props.width : "w-full"
            } ${props.height ? "h-" + props.height : "h-13"}`}
            onKeyDown={handleEnterKey}
            onChange={handleSetValues}
            value={inputValue}
          />
        );
      case "select":
        return (
          <select
            className={`border border-gray-300 rounded-full py-1 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              props.className ?? ""
            } ${props.icon ? "pr-10" : ""} ${
              props.width ? "w-" + props.width : "w-full"
            } ${props.height ? "h-" + props.height : "h-13"}`}
            value={inputValue}
            onChange={handleSetValuesSelect}
          >
            {props.selectOptions?.map((option) => (
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
              className="border-2 border-dashed border-gray-300 h-50 hover:border-blue-500 flex items-center justify-center hover:text-blue-500"
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
      {props.label && (
        <label htmlFor={props.name} className="mb-1">
          {props.label}
        </label>
      )}
      <div className="relative">
        {renderInput(props.inputType)}
        {props.icon && (
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
      {props.addEnterHint && (
        <div className="text-xs text-gray-400 mt-1">Press Enter to add</div>
      )}
    </div>
  );
};

export default PillInput;
