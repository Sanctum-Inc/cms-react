interface PillInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value"
> {
  label?: string;
  values?: string[];
  value: string;
  onAdd?: (value: string) => void;
  onRemove?: (index: number) => void;
  addEnterHint?: boolean;
  error?: boolean;
  disabled?: boolean;
}

const PillInput = ({
  label,
  values,
  value,
  onAdd,
  onRemove,
  addEnterHint,
  error,
  disabled,
  ...rest
}: PillInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!addEnterHint || disabled) return;
    if (e.key !== "Enter") return;

    e.preventDefault();
    if (!value.trim()) return;

    if (onAdd) {
      onAdd(value.trim());
    }
  };

  return (
    <div className="flex flex-col w-full mt-3">
      {label && <label className="mb-1 ml-3.5">{label}</label>}

      <input
        {...rest}
        value={value}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        className={`border rounded-full px-3 py-1 focus:ring-1 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />

      {values && values.length > 0 && (
        <div className="flex flex-wrap mt-2 gap-2">
          {values.map((val, i) => (
            <span
              key={i}
              className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center"
            >
              {val}
              <button className="ml-2 text-red-500" onClick={() => onRemove && onRemove(i)}>
                ×
              </button>
            </span>
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
