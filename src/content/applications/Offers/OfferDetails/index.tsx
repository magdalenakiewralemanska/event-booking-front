import { Helmet } from 'react-helmet-async';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import Footer from 'src/components/Footer';
import Packages from './Packages';
import WeekSchedule from './WeekSchedule';
import OfferDescription from './OfferDescription';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { OfferPackage } from 'src/models/OfferPackage';
import { Offer } from 'src/models/Offer';
import { Order } from 'src/models/Order';
import { UserContext } from 'src/contexts/UserContext';
import { toast } from 'react-toastify';
import { authorizedApi } from 'src/interceptor/AxiosInterceptor';

function OfferDetails() {
  const [selectedOffer, setSelectedOffer] = useState<Offer>(null);
  const { eventId, offerId } = useParams();
  const [offerPackages, setOfferPackages] = useState<OfferPackage[]>([]);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<Order>({
    userId: 0,

    offer: null,
    offerPackage: null,

    date: null,
    startHour: '',
    endHour: ''
  });
  const [error, setError] = useState<string>('');

  const [validationError, setValidationError] = useState<boolean>(false);
  const isLoggedIn = !!currentUser;

  const fetchOfferDetails = async () => {
    try {
      const offerResponse = await axios.get(
        `/events/${eventId}/offers/${offerId}`
      );
      const offerData = offerResponse.data;
      setSelectedOffer(offerData);

      const offerPackageResponse = await axios.get(`/offers/${offerId}`);
      const offerPackagesData = offerPackageResponse.data;
      setOfferPackages(offerPackagesData);
    } catch (error) {
      console.error('Error fetching offer details:', error);
    }
  };

  const handlePackageSelection = (packageId: number) => {
    const selectedPackage = offerPackages.find(
      (offerPackage) => offerPackage.id === packageId
    );

    setSelectedOrder((prevOrder) => ({
      ...prevOrder,
      offerPackage: selectedPackage,
      offer: selectedOffer, // Set the offer property with the selectedOffer
      userId: currentUser.id // Set the userId property with the current user's ID
    }));
  };

  const handleOrderSubmit = async () => {
    if (!selectedOrder.offerPackage) {
      setValidationError(true);
      setError('Please select a package before submitting the order.');
    } else if (!selectedOrder.startHour) {
      setValidationError(true);
      setError(
        'Please select a package and a start hour before submitting the order.'
      );
    } else if (!isLoggedIn) {
      setValidationError(true);
      setError(
        'You have to be logged in before you book any event. Please log in or register a new account.'
      );
      return;
    } else {
      // Add a check for currentUser
      try {
        const updatedOrder = {
          ...selectedOrder
        };

        setValidationError(false);
        await axios.post(`/orders/addOrder`, updatedOrder);
        console.log('Order submitted successfully!');
        toast.success('Order booked successfully', {
          position: toast.POSITION.TOP_CENTER
        });
        navigate(`/user/myEvents`);
      } catch (error) {
        console.error('Error submitting order:', error);
      }
    }
  };

  useEffect(() => {
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
            {selectedOffer && (
              <OfferDescription
                offer={selectedOffer}
                eventId={eventId}
                currentUser={currentUser}
                isLoggedIn={isLoggedIn}
              />
            )}
          </Grid>
          <Grid item xs={12} md={12}>
            <WeekSchedule
              onDateSelected={(date: string, startHour: string) =>
                setSelectedOrder((prevOrder) => ({
                  ...prevOrder,
                  date: new Date(date),
                  startHour
                }))
              }
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Packages
              offerPackages={offerPackages}
              eventId={eventId}
              offerId={offerId}
              fetchPackages={fetchOfferDetails}
              onSelectPackage={handlePackageSelection}
              currentUser={currentUser}
              isLoggedIn={isLoggedIn}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Card>
              <CardHeader />

              <Grid
                container
                direction="column"
                alignItems="center"
                spacing={3}
              >
                <Grid p={3}>
                  {validationError && (
                    <Typography variant="body2" color="error">
                      {error}
                    </Typography>
                  )}
                </Grid>
                <Grid paddingBottom={3}>
                  <Button variant="contained" onClick={handleOrderSubmit}>
                    Submit Order
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default OfferDetails;
