import { Outlet } from "react-router-dom";
import Navigation from "../Components/Navigation/Navigation";

function MainLayout() {
    return (
        <div className='flex'>
            <Navigation />
            <div className="block w-full bg-(--color-hover-light) min-h-screen">
                <Outlet /> 
            </div>
      </div>
  );
}

export default MainLayout;