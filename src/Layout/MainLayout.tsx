import { Outlet } from "react-router-dom";
import Navigation from "../Components/Navigation/Navigation";

const MainLayout = () => {
    return (
      <div className="flex">
        <Navigation />

        <div className="flex-1 h-screen overflow-y-auto bg-(--color-hover-light)">
          <Outlet />
        </div>
      </div>
    );
}

export default MainLayout;