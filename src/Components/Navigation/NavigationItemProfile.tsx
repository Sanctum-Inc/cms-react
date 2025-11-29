import { type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import * as React from "react";
import defaultIcon from "../../assets/default-profile-icon.jpg";
import { useNavigate } from "react-router-dom";

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
    event: React.SyntheticEvent<HTMLImageElement, Event>
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
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session data (e.g., tokens, user info)
    localStorage.removeItem("accessToken");
    // Redirect to login page or homepage
    navigate("/login");
  };

  return (
    <>
      <a className="py-3 mt-auto" href={url}>
        <div className="flex items-center hover:text-(--color-primary)">
          <span>
            <ImageWithFallback
              /*src={ props.profileImage }*/
              src={defaultIcon}
              alt="profile-image"
              fallbackSrc={defaultIcon}
            />
          </span>
          <span className="flex flex-col ml-2">
            <span>
              {name} {surname}
            </span>
            <span>{email}</span>
          </span>
        </div>
      </a>
      <div id="logout-container" className="w-full justify-center">
        <div className="mt-2">
          <PrimaryButton
            centerText={false}
            color="red"
            hoverColor="darkred"
            onClick={handleLogout}
          >
            Logout
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default NavigationItemProfile;
