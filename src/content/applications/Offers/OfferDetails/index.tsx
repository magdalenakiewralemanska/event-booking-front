import { Helmet } from 'react-helmet-async';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import Packages from './OfferPackages';
import WeekSchedule from './WeekSchedule';
import OfferDescription from './OfferDescription';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function OfferDetails() {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const { eventId, offerId } = useParams();

  useEffect(() => {
    const fetchOfferDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/events/${eventId}/offers/${offerId}`
        );
        const data = response.data;
        setSelectedOffer(data);
      } catch (error) {
        console.error('Error fetching offer details:', error);
      }
    };

    fetchOfferDetails();
  }, [eventId, offerId]);

  return (
    <>
      <Helmet>
        <title>Offer Details</title>
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
            {selectedOffer && <OfferDescription offer={selectedOffer} />}
          </Grid>
          <Grid item xs={12} md={12}>
            <WeekSchedule />
          </Grid>
          <Grid item xs={12} md={12}>
            <Packages />
          </Grid>
          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default OfferDetails;
