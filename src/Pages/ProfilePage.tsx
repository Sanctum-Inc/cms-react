import { Briefcase, User } from "lucide-react";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import Card from "../Components/Cards/Card";
import Header from "../Components/Header/Header";
import { useState } from "react";
import UserProfile from "../Components/Profile/UserProfile";
import CompanyProfile from "../Components/Profile/CompanyProfile";
import TabNavigation from "../Components/Navigation/TabNavigation";

const ProfilePage = () => {
  const [selectedMenu, setSelectedMenu] = useState("User Profile");

  const profileMenus = [
    {
      label: "User Profile",
      icon: User,
    },
    {
      label: "Company Profile",
      icon: Briefcase,
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
        />
      );
    });
  };

  const renderProfileInputs = () => {
    if (selectedMenu === "User Profile") {
      return <UserProfile/>;
    }
    else if (selectedMenu === "Company Profile") {
      return <CompanyProfile/>;
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
      <Card className="mx-48 p-6">
        <div className="text-3xl font-semibold border-b border-gray-200 mb-8 pb-3">
          {selectedMenu}
        </div>
        <div className="">{renderProfileInputs()}</div>
        <div className="mt-5 flex justify-end">
          <div className="w-1/6">
            <PrimaryButton>Save Profile Changes</PrimaryButton>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ProfilePage;
