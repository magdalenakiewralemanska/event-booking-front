import { useState, useContext } from 'react';
import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
  TextField
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import axios from 'axios';
import { UserContext } from 'src/contexts/UserContext';
import { User } from 'src/models/User';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

function ChangePasswordTab() {
  const { currentUser } = useContext(UserContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleCurrentPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value);
  };

  const handleChangePassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%-*?&]{10,}$/;

    const passwordChangeData: User = {
      ...currentUser,
      currentPassword: currentPassword,
      newPassword: newPassword
    };
    if (!passwordRegex.test(newPassword)) {
      setErrorMessage(
        'Invalid password format. The password should contain at least 10 characters, including one uppercase letter and one special character.'
      );
      return;
    }
    axios
      .put(`/user/changePassword`, passwordChangeData)
      .then((response) => {
        setErrorMessage('');
        setCurrentPassword('');
        setNewPassword('');

        toast.success('Password changed successfully', {
          position: toast.POSITION.TOP_CENTER
        });
        navigate(`/user/details`);

        console.log(response.data);
      })
      .catch((error) => {
        // Handle error response
        if (error.response) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage('Error changing password. Please try again.');
        }
      });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={9}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h3" gutterBottom>
                Change your password
              </Typography>
            </Box>
            <Button
              variant="text"
              startIcon={<EditTwoToneIcon />}
              onClick={handleChangePassword}
            >
              Change password
            </Button>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Box px={3} pb={2}>
              <Box p={1}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  Your current password
                </Typography>
                <TextField
                  required
                  id="current-password"
                  label="Required"
                  type="password"
                  sx={{ minWidth: 400 }}
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
                />
              </Box>
              <Box p={1}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  New password
                </Typography>
                <TextField
                  required
                  id="new-password"
                  label="Required"
                  type="password"
                  sx={{ minWidth: 400 }}
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
              </Box>
            </Box>
            {errorMessage && (
              <Typography color="error" variant="body1">
                {errorMessage}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ChangePasswordTab;
