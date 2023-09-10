import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  Avatar,
  Button,
  CardHeader
} from '@mui/material';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { styled } from '@mui/material/styles';
import {
  NavLink as RouterLink,
  useNavigate,
  useParams
} from 'react-router-dom';
import axios from 'axios';

import SuspenseLoader from 'src/components/SuspenseLoader';
import FilterPanel from './Filters';
import { UserContext } from 'src/contexts/UserContext';
import { toast } from 'react-toastify';

const OffersList = () => {
  const [eventOffers, setEventOffers] = useState([]);
  const { eventId } = useParams();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const isLoggedIn = !!currentUser;
  const [minAgeFilter, setMinAgeFilter] = useState(0);
  const [filteredOffers, setFilteredOffers] = useState([]);

  const fetchEventOffers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/events/${eventId}/offers`
      );
      const data = response.data;
      setEventOffers(data);
    } catch (error) {
      console.error('Error fetching event offers:', error);
    }
  };

  useEffect(() => {
    fetchEventOffers();
  }, [eventId]);

  const theme = useTheme();

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteOffer = async (offerId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/events/${eventId}/offers/${offerId}`
      );
      setEventOffers(eventOffers.filter((offer) => offer.id !== offerId));
    } catch (error) {
      console.error('Error deleting offer: ', error);
      if (error.response && error.response.status === 500) {
        toast.error(
          'Cannot delete an offer that has been reserved by a customer.',
          {
            position: toast.POSITION.TOP_CENTER
          }
        );
      }
    }
  };

  const applyFilters = () => {
    const filtered = eventOffers.filter(
      (offer) => offer.minAge <= minAgeFilter
    );
    setFilteredOffers(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [minAgeFilter]);

  const handleFilterApply = () => {
    applyFilters();
  };

  const handleFilterCancel = () => {
    // Handle filter cancel logic here
  };

  const handleMinAgeFilterChange = (event) => {
    const value = event.target.value;
    setMinAgeFilter(Number(value));
  };

  const indexOfLastItem = (page + 1) * limit;
  const indexOfFirstItem = indexOfLastItem - limit;
  const currentItems = filteredOffers.length > 0 ? filteredOffers : eventOffers;

  const ImageWrapper = styled(Card)(
    ({ theme }) => `
    position: relative;
    display: inline-block;
    
    .MuiAvatar-root {
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};
    }`
  );

  return (
    <Card>
      <CardHeader
        title="Current offers"
        action={
          <Box display="flex" gap={3}>
            <Box>
              <Button
                variant="contained"
                color="warning"
                component={RouterLink}
                to={`/events`}
              >
                Back to the event list
              </Button>
            </Box>
            {isLoggedIn && currentUser.role === 'ADMIN' && (
              <Button
                variant="contained"
                component={RouterLink}
                to={`/events/${eventId}/offers/addOffer`}
              >
                Add new offer
              </Button>
            )}
          </Box>
        }
      />
      <Divider />
      <FilterPanel
        onFilterApply={handleFilterApply}
        onFilterCancel={handleFilterCancel}
        minAgeFilter={minAgeFilter}
        onMinAgeFilterChange={handleMinAgeFilterChange}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>

              <TableCell>Minimal age</TableCell>
              <TableCell>Maximal age</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="right" />
              {isLoggedIn && currentUser.role === 'ADMIN' && (
                <TableCell align="right">Actions</TableCell>
              )}
              {isLoggedIn && currentUser.role === 'ADMIN' && (
                <TableCell align="right" />
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No offers available.
                </TableCell>
              </TableRow>
            ) : (
              currentItems
                .slice(indexOfFirstItem, indexOfLastItem)
                .map((offer) => (
                  <TableRow hover key={offer.id}>
                    <TableCell>
                      <ImageWrapper>
                        <Avatar
                          variant="rounded"
                          alt="image"
                          src={offer.picturePath}
                        />
                      </ImageWrapper>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {offer.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {offer.minAge}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {offer.maxAge}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {offer.address && (
                        <>
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {offer.address.street} {offer.address.houseNumber}/
                            {offer.address.apartmentNumber}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                          >
                            {offer.address.zipCode} {offer.address.city}
                          </Typography>
                        </>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        sx={{ margin: 1 }}
                        color="primary"
                        component={RouterLink}
                        to={`/events/${eventId}/offers/${offer.id}`}
                      >
                        Offer details
                      </Button>
                    </TableCell>
                    {isLoggedIn && currentUser.role === 'ADMIN' && (
                      <TableCell align="right">
                        <Tooltip title="Edit Offer" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.primary.lighter
                              },
                              color: theme.palette.primary.main
                            }}
                            color="inherit"
                            size="large"
                            onClick={() =>
                              navigate(
                                `/events/${eventId}/offers/updateOffer/${offer.id}`
                              )
                            }
                          >
                            <EditTwoToneIcon fontSize="large" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    )}
                    {isLoggedIn && currentUser.role === 'ADMIN' && (
                      <TableCell>
                        <Tooltip title="Delete Offer" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.error.lighter
                              },
                              color: theme.palette.error.main
                            }}
                            color="inherit"
                            size="large"
                            onClick={() => handleDeleteOffer(offer.id)}
                          >
                            <DeleteTwoToneIcon fontSize="large" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    )}
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={currentItems.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

OffersList.propTypes = {
  offers: PropTypes.array.isRequired,
  eventId: PropTypes.number.isRequired
};

export default OffersList;
