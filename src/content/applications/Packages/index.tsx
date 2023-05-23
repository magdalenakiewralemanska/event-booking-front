import { Helmet } from 'react-helmet-async';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import PackageDetails from './PackageDetails';

function Tooltips() {
  return (
    <>
      <Helmet>
        <title>Tooltips - Components</title>
      </Helmet>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={12}>
            <PackageDetails />
          </Grid>
          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Tooltips;
