interface cardProps {
    hover?: boolean;
    className?: string;
    children?: React.ReactNode;
}
const Card = ({className, children, hover}: cardProps) => {
    return (
      <div
        className={`border border-gray-300 rounded-2xl p-4  items-center bg-white 
            ${
              hover
                ? "hover:border-(--color-primary) hover:shadow-md cursor-pointer"
                : ""
            } 
        transition-shadow duration-200 ${className}`}
      >
        {children}
      </div>
    );
}

export default Card;