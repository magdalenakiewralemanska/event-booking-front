import { Typography, Grid } from '@mui/material';

function PageHeader() {
  const user = {
    name: 'Magda K-L'
  };

  return (
    <Grid container alignItems="center">
      <Grid item></Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {user.name}!
        </Typography>
        <Typography variant="subtitle2">Book your new event!</Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
