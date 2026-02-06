import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

const colorMap = {
  red: "bg-red-500 hover:bg-red-700 text-white",
  blue: "bg-blue-500 hover:bg-blue-700 text-white",
  green: "bg-green-500 hover:bg-green-700 text-white",
  gray: "bg-gray-500 hover:bg-gray-700 text-white",
  lightGray: "bg-gray-200 hover:bg-gray-300 text-gray-500",
};

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: keyof typeof colorMap;
  centerText?: boolean;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  loading?: boolean;
  removeMargin?: boolean;
}

const PrimaryButton = ({
  color = "blue",
  centerText = true,
  removeMargin: removePadding = false,
  ...props
}: PrimaryButtonProps) => {
  const base =
    "w-full font-bold py-2 px-4 rounded-xl transition duration-300";
  const padding = removePadding ? "" : "mb-4";
  const alignment = centerText ? "text-center" : "";
  const colorClasses = colorMap[color];

  return (
    <button
      className={`${base} ${colorClasses} ${alignment} ${padding} flex items-center justify-center`}
      type="button"
      {...{
        ...props,
      }}
    >
      {props.icon && !props.loading && (
        <span className="inline-flex mr-2 pointer-events-none">
          <props.icon size={16} />
        </span>
      )}
      {props.loading ? (
        <span className="flex items-center">
          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
        </span>
      ) : (
        props.children
      )}
    </button>
  );
};

export default PrimaryButton;
