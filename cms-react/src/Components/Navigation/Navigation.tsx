import { CircleUser } from 'lucide-react';

function Navigation() {
    return (
        <div className='w-75 border border-solid border-black'>
            <div id='brand-information'>
                <div className='flex justify-center'>
                    <span className='text-2xl'>CMS</span>
                </div>
                <img id='brand-logo' src='' alt='Brand Logo'/>
            </div>
            <div id='profile'>
                <div id='profile-picture' className='flex justify-center'>
                    <CircleUser className="w-35 h-35" />
                </div>
                <div id='profile-name-surname' className='flex justify-center'>
                    John Doe
                </div>
                <div id='profile-email' className='flex justify-center'>
                    JohnDoe@example.com
                </div>
                <div id='divider'></div>
            </div>

        </div>
  );
}

export default Navigation;