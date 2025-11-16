interface cardProps {
    hover?: boolean;
    className?: string;
    children?: React.ReactNode;
}
const Card = ({className = "", children, hover}: cardProps) => {
    // If a background utility (bg-*) is provided in the incoming className,
    // don't force the default `bg-white` so callers can override background.
    const hasBgClass = /\bbg-[^\s]+/.test(className);
    const defaultBg = hasBgClass ? "" : "bg-white";

    return (
      <div
        className={`border border-gray-300 rounded-2xl p-4 items-center ${defaultBg} ${
          hover ? "hover:shadow-md cursor-pointer" : ""
        } transition-shadow duration-200 ${className}`}
      >
        {children}
      </div>
    );
}

export default Card;