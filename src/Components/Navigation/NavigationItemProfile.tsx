import { type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import * as React from "react";
import { Link } from "react-router-dom";
import defaultIcon from "../../assets/default-profile-icon.jpg";
import useAuthentication from "../../Context/Authentication/useAuthentication";
import PrimaryButton from "../Buttons/PrimaryButton";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackSrc: string;
}
interface NavigationItemProfileProps {
  name: string;
  surname: string;
  email: string;
  profileImage: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc,
}) => {
  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    event.currentTarget.src = fallbackSrc;
  };

  return <img src={src} alt={alt} onError={handleError} className="w-10" />;
};
const NavigationItemProfile = ({
  name,
  surname,
  email,
  href: url,
}: NavigationItemProfileProps) => {
  const { logout } = useAuthentication();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="mt-auto overflow-hidden w-full">
      <Link className="py-3 block w-full" to={url}>
        <div className="flex items-center hover:text-(--color-primary) w-full min-w-0">
          <span className="shrink-0">
            <ImageWithFallback
              src={defaultIcon}
              alt="profile-image"
              fallbackSrc={defaultIcon}
            />
          </span>

          {/* min-w-0 is essential here to allow flex children to truncate */}
          <span className="flex flex-col ml-2 min-w-0">
            <span className="font-medium truncate text-gray-900">
              {name} {surname}
            </span>
            <span className="text-sm text-gray-500 truncate">{email}</span>
          </span>
        </div>
      </Link>

      <div id="logout-container" className="w-full justify-center">
        <div className="mt-2">
          <PrimaryButton centerText={false} color="red" onClick={handleLogout}>
            Logout
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default NavigationItemProfile;
