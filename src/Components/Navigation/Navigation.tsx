import {
  BriefcaseBusiness,
  CalendarDays,
  FolderOpenDot,
  House,
  LogOut,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { UserService } from "../../api";
import brandLogo from "../../assets/crest-removebg-cropped.png";
import NavigationItem from "./NavigationItem";
import NavigationItemProfile from "./NavigationItemProfile";

const Navigation = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
  });

  useEffect(() => {
    // Any side effects or data fetching can be done here
    UserService.getById("current").then((response) => {
      setUser({
        name: response.name,
        surname: response.surname,
        email: response.email,
      });
    });
  }, []);

  return (
    <div className="w-1/8 h-screen flex flex-col px-3 border-r-2 border-solid border-gray-300">
      <div id="brand-information-container" className="p-2">
        <div className="flex justify-center">
          {/* <span className="text-5xl text-(--color-primary) font-bold">
              CMS
            </span> */}
        </div>
        <img
          id="brand-logo"
          src={brandLogo}
          alt="Brand Logo"
          className="w-16 h-16 mx-auto mb-2"
        />
      </div>
      <div id="dashboard-naviagation-container">
        <h3 className="font-medium text-gray-400">Dashboard</h3>
        <NavigationItem
          icon={BriefcaseBusiness}
          name="Home"
          url="/dashboard"
        ></NavigationItem>
      </div>
      <div
        id="management-navigation-container"
        className="h-auto flex grow flex-col"
      >
        <h3 className="font-medium text-gray-400">Management</h3>
        <NavigationItem
          icon={House}
          name="Court Case"
          url="/court-case"
        ></NavigationItem>
        <NavigationItem
          icon={Wallet}
          name="Invoices"
          url="/invoices"
        ></NavigationItem>
        <NavigationItem
          icon={CalendarDays}
          name="Dates"
          url="/dates"
        ></NavigationItem>
        <NavigationItem
          icon={FolderOpenDot}
          name="Documents"
          url="/documents"
        ></NavigationItem>
        <NavigationItemProfile
          icon={LogOut}
          name={user.name}
          surname={user.surname}
          email={user.email}
          profileImage=""
          href="/profile"
        ></NavigationItemProfile>
      </div>
    </div>
  );
};

export default Navigation;
