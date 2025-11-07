import { type LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

interface NavigationItemProps {
    name: string;
    url: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

 const NavigationItem = (props: NavigationItemProps) => {
    return (
        <a className='py-5 flex hover:text-(--color-primary)' href={props.url}>
            <span>
                <props.icon />
            </span>
            <span className="ml-2">
                { props.name}
            </span>
        </a>
    );

}

export default NavigationItem;