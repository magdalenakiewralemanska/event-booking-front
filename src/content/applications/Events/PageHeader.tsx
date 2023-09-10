import { Typography, Grid } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from 'src/contexts/UserContext';

function PageHeader() {
  const { currentUser } = useContext(UserContext);
  const isLoggedIn = !!currentUser;

  return (
    <Grid container alignItems="center">
      <Grid item></Grid>
      <Grid item>
        {!isLoggedIn && (
          <Typography variant="h3" component="h3" gutterBottom>
            Welcome!
          </Typography>
        )}

        {isLoggedIn && (
          <Typography variant="h3" component="h3" gutterBottom>
            Welcome, {currentUser.firstName}!
          </Typography>
        )}
        <Typography variant="subtitle2">Book your new event!</Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
