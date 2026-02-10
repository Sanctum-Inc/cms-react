import { type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { Link } from "react-router-dom";

interface NavigationItemProps {
  name: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

const NavigationItem = (props: NavigationItemProps) => {
  return (
    <Link className="py-5 flex hover:text-(--color-primary)" to={props.url}>
      <span>
        <props.icon />
      </span>
      <span className="ml-2">{props.name}</span>
    </Link>
  );
};

export default NavigationItem;
