interface cardProps {
  hover?: boolean;
  className?: string;
  children?: React.ReactNode;
  removePadding?: boolean;
  removeBorder?: boolean;
}
const Card = ({
  className = "",
  children,
  hover,
  removePadding,
  removeBorder,
}: cardProps) => {
  // If a background utility (bg-*) is provided in the incoming className,
  // don't force the default `bg-white` so callers can override background.
  const hasBgClass = /\bbg-[^\s]+/.test(className);
  const defaultBg = hasBgClass ? "" : "bg-white";

  return (
    <div
      className={`${removeBorder ? "" : "border border-gray-300 "} ${
        removePadding ? "" : "p-4"
      } items-center rounded-2xl ${defaultBg} ${
        hover ? "hover:shadow-md cursor-pointer" : ""
      } transition-shadow duration-200 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;