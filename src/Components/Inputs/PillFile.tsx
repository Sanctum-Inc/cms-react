import { Plus } from "lucide-react";
import { useState, type ChangeEvent } from "react";

interface PillFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  disabled?: boolean;
  className?: string;
  customOnChange?: (files: File[]) => void;
}

const PillFile = (props: PillFileProps) => {
  const { label, disabled, className, customOnChange, name } = props;

  const [getValues, setValues] = useState<string[]>([]);
  const [getFiles, setFiles] = useState<File[]>([]);

  const disabledStyles = disabled
    ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
    : "border-gray-300 hover:border-blue-500 hover:text-blue-500 cursor-pointer";

  const handleFileOpen = () => {
    if (disabled) return;
    const input = document.getElementById(
      `hidden-file-input-${name}`,
    ) as HTMLInputElement | null;
    input?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const files = e.target.files ? Array.from(e.target.files) : [];

    files.forEach((file) => {
      const updated = [...getValues, file.name];
      setValues(updated);
      setFiles((prev) => [...prev, file]);

      customOnChange?.([...getFiles, file]);
    });
  };

  return (
    <div className="flex flex-col w-full mt-3">
      {label && (
        <label
          htmlFor={name}
          className={`mb-1 ml-3.5 ${disabled ? "text-gray-400" : ""}`}
        >
          {label}
        </label>
      )}

      <div
        className={`border-2 border-dashed h-50 flex items-center justify-center ${disabledStyles} ${className ?? ""}`}
        onClick={handleFileOpen}
      >
        <Plus size={72} />
      </div>
      <input
        type="file"
        name={name}
        id={`hidden-file-input-${name}`}
        hidden
        multiple
        onChange={handleFileChange}
        disabled={disabled}
      />

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
                  onClick={() => {
                    setValues(getValues.filter((_, i) => i !== index));
                    setFiles(getFiles.filter((_, i) => i !== index));
                    // Also notify parent of updated files list
                    customOnChange?.(getFiles.filter((_, i) => i !== index));
                  }}
                >
                  x
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PillFile;
