import { Outlet } from "react-router-dom";
import { hasUserLoggedOut } from './authService'; 

const Layout = () => {
  return (
    <>

      {/* Display "Session Expired" message if the user has logged out */}
      {hasUserLoggedOut() && <div>Session Expired, Login Again</div>}

      <Outlet />
    </>
  );
};

export default Layout;
