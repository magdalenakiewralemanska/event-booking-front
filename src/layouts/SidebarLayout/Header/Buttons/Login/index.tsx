import { Box, Button, Tooltip } from '@mui/material';

import LockIcon from '@mui/icons-material/Lock';
import { NavLink as RouterLink } from 'react-router-dom';

function Login() {
  return (
    <>
      <Tooltip arrow title="Search">
        <Box>
          <Button
            color="primary"
            fullWidth
            component={RouterLink}
            to="/user/login"
          >
            <LockIcon sx={{ mr: 1 }} />
            Log in
          </Button>
        </Box>
      </Tooltip>
    </>
  );
}

export default Login;
