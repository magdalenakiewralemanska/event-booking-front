import { Helmet } from 'react-helmet-async';
import {
  Button,
  Card,
  CardHeader,
  Container,
  Grid,
  Typography
} from '@mui/material';
import Footer from 'src/components/Footer';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Order } from 'src/models/Order';
import { UserContext } from 'src/contexts/UserContext';
import OrderPackageDetails from './OrderPackageDetails';
import OrderDetails from './OrderDetails';
import { authorizedApi } from 'src/interceptor/AxiosInterceptor';

function UserOrder() {
  const { orderId } = useParams();
  const [selectedOrder, setSelectedOrder] = useState<Order>();

  const fetchOrderDetails = async () => {
    try {
      const orderResponse = await axios.get(`/orders/${orderId}`);
      const orderData = orderResponse.data;
      setSelectedOrder(orderData);
      console.log(orderData);
    } catch (error) {
      console.error('Error fetching offer details:', error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  return (
    <>
      <Helmet>
        <title>Order Details</title>
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
            {selectedOrder && <OrderDetails order={selectedOrder} />}
            {selectedOrder && <OrderPackageDetails order={selectedOrder} />}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default UserOrder;
