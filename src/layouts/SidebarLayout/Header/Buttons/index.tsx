import { Box } from '@mui/material';
import HeaderSearch from './Search';
import HeaderLogin from './Login';
import { UserLogout } from 'src/content/applications/Users/Login/Logout';
import { useContext } from 'react';
import { UserContext } from 'src/contexts/UserContext';

function HeaderButtons() {
  const { currentUser } = useContext(UserContext);
  const isLoggedIn = !!currentUser;
  return (
    <>
      <Box sx={{ mr: 1 }}>
        {!isLoggedIn && <HeaderLogin />}
        {isLoggedIn && <UserLogout />}
      </Box>
    </>
  );
}

export default HeaderButtons;
