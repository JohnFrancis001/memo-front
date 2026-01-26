import { useAuth } from '../contexts/AuthContext';
import axios from 'axios'
import { MdLogout } from 'react-icons/md'
import { useUser } from '../contexts/Username'

// The Header component with props of togglig it on small size
const Header = ({openDrawer}) => {

    // state and function from context api to validate the login of user
    const { isLoggedIn, logout } = useAuth();
    // name from context api to show the user's name on the header on large screens
    const { name } = useUser();

     // logoutt - a distinct name for the context api's prop function and a function to log out the user, hitting the backend api
     const logoutt = async () => {
        try{
          const logOut = await axios.get(`${import.meta.env.VITE_API_URL}/log/logout`, {
            withCredentials: true
          })
          console.log(logOut);
          console.log(isLoggedIn)
          if(logOut.status === 200){
             logout();
             console.log(isLoggedIn)
          }
          console.log(isLoggedIn)
        }catch(e){
          console.error(e);
          console.log(isLoggedIn);
        }
      }


  return (
    <header className='header h-[20vh]' >
        <div onClick={openDrawer} className='flex items-center justify-center flex-col gap-1 group border-2 border-white p-1 rounded-md cursor-pointer lg:hidden' >
          <span className='bg-white h-0.5 w-6 rounded group-hover:bg-teal-500 transition-colors duration-300' ></span>
          <span className='bg-white h-0.5 w-6 rounded group-hover:bg-teal-500 transition-colors duration-300' ></span>
          <span className='bg-white h-0.5 w-6 rounded group-hover:bg-teal-500 transition-colors duration-300' ></span>
        </div>
        <div>
        <h3 className='hidden lg:block' >{name}</h3>
        <h1 className='text-xl font-mono lg:text-3xl' >MEMO NOTES</h1>
        </div>
        

        <MdLogout onClick={logoutt} color='#e63946'  size={50} className='px-2 rounded m-2 transition cursor-pointer' />
      </header>
  )
}

export default Header