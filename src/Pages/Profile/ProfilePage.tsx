import { Briefcase, User } from "lucide-react";
import { useState } from "react";
import Card from "../../Components/Cards/Card";
import Header from "../../Components/Header/Header";
import TabNavigation from "../../Components/Navigation/TabNavigation";
import CompanyProfile from "./CompanyProfile";
import UserProfile from "./UserProfile";

const ProfilePage = () => {
  const [selectedMenu, setSelectedMenu] = useState("User Profile");

  const profileMenus = [
    {
      label: "User Profile",
      icon: User,
      color: "purple",
    },
    {
      label: "Company Profile",
      icon: Briefcase,
      color: "blue",
    },
  ];

  const renderProfileMenu = () => {
    return profileMenus.map((menu, index) => {
      return (
        <TabNavigation
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          menu={menu}
          index={index}
          className="pt-7"
          color={menu.color}
        />
      );
    });
  };

  const renderProfileInputs = () => {
    if (selectedMenu === "User Profile") {
      return <UserProfile />;
    } else if (selectedMenu === "Company Profile") {
      return <CompanyProfile />;
    }
  };

  return (
    <>
      <Header showButton={false} title="Profile Management" />
      <div className="m-6 p-6 text-2xl font-semibold">
        <div className="flex border-b border-gray-200">
          {renderProfileMenu()}
        </div>
      </div>
      <Card className="mx-auto w-2/3 mb-5 p-6">
        <div className="text-3xl font-semibold border-b border-gray-200 mb-8 pb-3">
          {selectedMenu}
        </div>
        <div className="">{renderProfileInputs()}</div>
      </Card>
    </>
  );
};

export default ProfilePage;
