import { Helmet } from 'react-helmet-async';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { useParams } from 'react-router-dom';
import OffersList from './OffersList';

const Offers = () => {
  const { eventId } = useParams();
  const parsedEventId = parseInt(eventId);
  return (
    <>
      <Helmet>
        <title>Event offers</title>
      </Helmet>
      <PageTitleWrapper />
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <OffersList eventId={parsedEventId} offers={[]} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Offers;
