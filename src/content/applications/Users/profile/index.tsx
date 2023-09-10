import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, Box } from '@mui/material';
import Footer from 'src/components/Footer';
import ProfileCover from './ProfileCover';
import Addresses from './Addresses';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from 'src/contexts/UserContext';
import axios from 'axios';
import { authorizedApi } from 'src/interceptor/AxiosInterceptor';

function ManagementUserProfile() {
  const { currentUser } = useContext(UserContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `/user/details/${currentUser.username}`
        );
        const userData = response.data;
        setUser(userData);
        console.log(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  return (
    <>
      <Helmet>
        <title>User Details - Management</title>
      </Helmet>
      <PageTitleWrapper>
        <Box display="flex" mb={3}>
          <Box>
            <Typography variant="h3" component="h3" gutterBottom>
              Profile for {currentUser.username}
            </Typography>
          </Box>
        </Box>
      </PageTitleWrapper>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            {user && <ProfileCover user={user} />}
          </Grid>
          <Grid item xs={12} md={8}>
            {user && <Addresses user={user} />}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementUserProfile;
