import { useContext } from 'react';
import { UserContext } from 'src/contexts/UserContext';
import { ACCESS_TOKEN } from 'src/constants/constants';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { toast } from 'react-toastify';

export const UserLogout = () => {
  const navigate = useNavigate();
  const { userModifier } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    userModifier(null);
    toast.success('User log out successfully', {
      position: toast.POSITION.TOP_CENTER
    });
    navigate(`/events`);
  };

  return (
    <Box sx={{ m: 1 }}>
      <Button color="primary" fullWidth onClick={handleLogout}>
        <LockOpenTwoToneIcon sx={{ mr: 1 }} />
        Log out
      </Button>
    </Box>
  );
};
