import type { LucideProps } from "lucide-react";
import {
  useState,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";

interface PillInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  addEnterHint?: boolean;
  width?: string;
  height?: string;
}

const PillInput = (props: PillInputProps) => {
  const [getValues, setValues] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && props.addEnterHint) {
      setValues([...getValues, inputValue]);
      setInputValue("");
    }

    if (e.key === "Enter" && props.onKeyDown) {
      props.onKeyDown(e);
    }
  };

  const handleSetValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };
  console.log(props);

  return (
    <div className="flex flex-col w-full mt-3">
      {props.label && (
        <label htmlFor={props.name} className="mb-1">
          {props.label}
        </label>
      )}
      <div className="relative">
        <input
          {...{ ...props, value: undefined, onChange: undefined, height: undefined, width: undefined }}
          className={`border border-gray-300 rounded-full py-1 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            props.className ?? ""
          } ${props.icon ? "pr-10" : ""}
          ${props.width ? "w-" + props.width : "w-full"}
          ${props.height ? "h-" + props.height: "h-13"}`}
          onKeyDown={handleEnterKey}
          onChange={handleSetValues}
          value={inputValue}
        />
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
