import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import Events from './Events';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

function EventBooking() {
  return (
    <>
      <Helmet>
        <title>Event booking</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item lg={12} xs={12}>
            <Events />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default EventBooking;
