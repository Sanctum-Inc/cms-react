import { Outlet } from "react-router-dom";
import Navigation from "../Components/Navigation/Navigation";
import { useState } from "react";

const MainLayout = () => {
    const [isGreyed, setGreyed] = useState(false);
    return (
            <div className='flex'>
                <Navigation isGreyed={isGreyed}/>
                <div className="block w-full bg-(--color-hover-light) min-h-screen">
                    <Outlet context={{ isGreyed, setGreyed }} /> 
                </div>
            </div>
  );
}

export default MainLayout;