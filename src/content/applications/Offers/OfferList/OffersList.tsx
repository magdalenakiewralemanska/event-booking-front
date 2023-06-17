import { FC, useState, useEffect } from 'react';
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

import { Offer as Offers } from 'src/models/Offer';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { styled } from '@mui/material/styles';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { NavLink as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface OfferListProps {
  className?: string;
  offers: Offers[];
  eventId: number;
}

const OffersList: FC<OfferListProps> = () => {
  const [eventOffers, setEventOffers] = useState<Offers[]>([]);
  const { eventId } = useParams();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const fetchEventOffers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/events/${eventId}/offers`
        );
        const data = response.data;
        console.log(response.data);
        setEventOffers(data);
      } catch (error) {
        console.error('Error fetching event offers:', error);
      }
    };

    fetchEventOffers();
  }, [eventId]);

  const theme = useTheme();

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteOffer = async (offerId: number) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/events/${eventId}/offers/${offerId}`
      );
      setEventOffers(eventOffers.filter((offer) => offer.id !== offerId));
    } catch (error) {
      console.error('Error in deleteing offer: ', error);
    }
  };

  const indexOfLastItem = (page + 1) * limit;
  const indexOfFirstItem = indexOfLastItem - limit;
  const currentItems = eventOffers.slice(indexOfFirstItem, indexOfLastItem);

  const ImageWrapper = styled(Card)(
    ({ theme }) => `
      position: relative;
      display: inline-block;
      
      .MuiAvatar-root {
        width: ${theme.spacing(12)};
        height: ${theme.spacing(12)};
      }`
  );

  const ButtonUploadWrapper = styled(Box)(
    ({ theme }) => `
      position: absolute;
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      bottom: -${theme.spacing(0)};
      right: -${theme.spacing(0)};
  
      .MuiIconButton-root {
        border-radius: 100%;
        background: ${theme.colors.primary.main};
        color: ${theme.palette.primary.contrastText};
        box-shadow: ${theme.colors.shadows.primary};
        width: ${theme.spacing(4)};
        height: ${theme.spacing(4)};
        padding: 1;
    
        &:hover {
          background: ${theme.colors.primary.dark};
        }
      }
  `
  );

  const Input = styled('input')({
    display: 'none'
  });

  return (
    <Card>
      <CardHeader
        title="Current offers"
        action={
          <Box>
            <Button
              variant="contained"
              component={RouterLink}
              to={`/events/${eventId}/offers/addOffer`}
            >
              Add new offer
            </Button>
          </Box>
        }
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Minimal age</TableCell>
              <TableCell>Maximal age</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="right" />
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((offer) => {
              return (
                <TableRow hover key={offer.id}>
                  <TableCell>
                    <ImageWrapper>
                      <Avatar
                        variant="rounded"
                        alt={'image'}
                        src={'/static/images/employees-party.jpg'}
                      />
                      <ButtonUploadWrapper>
                        <Input
                          accept="image/*"
                          id="icon-button-file"
                          name="icon-button-file"
                          type="file"
                        />
                        <label htmlFor="icon-button-file">
                          <IconButton component="span" color="primary">
                            <UploadTwoToneIcon />
                          </IconButton>
                        </label>
                      </ButtonUploadWrapper>
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
                      maxWidth={400}
                      gutterBottom
                      noWrap
                    >
                      {offer.description}
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
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {offer.address.zipCode} {offer.address.city}
                    </Typography>
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
                  <TableCell align="right">
                    <Tooltip title="Delete Offer" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={eventOffers.length}
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
  offers: PropTypes.array.isRequired
};

OffersList.defaultProps = {
  offers: []
};

export default OffersList;
