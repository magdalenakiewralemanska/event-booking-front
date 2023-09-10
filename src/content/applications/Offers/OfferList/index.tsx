import { Helmet } from 'react-helmet-async';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

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
      <Grid item xs={12} m={5}>
        <OffersList eventId={parsedEventId} offers={[]} />
      </Grid>

      <Footer />
    </>
  );
};

export default Offers;
