interface TabNavigationProps {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
  menu: {
    label: string;
    icon: React.ForwardRefExoticComponent<
      Omit<import("lucide-react").LucideProps, "ref"> &
        import("react").RefAttributes<SVGSVGElement>
    >;
  };
  index: number;
  className?: string;
  color: string;
}

const TabNavigation = ({
  selectedMenu,
  setSelectedMenu,
  menu,
  index,
  className,
  color,
}: TabNavigationProps) => {
  return (
    <div
      className={`rounded-t-2xl ml-2 cursor-pointer ${
        selectedMenu === menu.label ? "bg-white" : ""
      }`}
      key={`${index}-tab-navigation`}
      onClick={() => setSelectedMenu(menu.label)}
    >
      <div
        className={`flex items-center  pb-2 pb-2 px-4 ${
          selectedMenu === menu.label ? "border-b-4 border-blue-500" : ""
        } ${className}`}
      >
        <span>
          <menu.icon color={color} />
        </span>
        <span className="px-2">{menu.label}</span>
      </div>
    </div>
  );
};

export default TabNavigation;
