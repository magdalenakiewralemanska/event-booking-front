import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Avatar,
  Button
} from '@mui/material';

import Label from 'src/components/Label';
import {
  Offers as Offers,
  OfferStatus as OfferStatus
} from 'src/models/Offers';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { styled } from '@mui/material/styles';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { NavLink as RouterLink } from 'react-router-dom';

interface OfferListProps {
  className?: string;
  offers: Offers[];
}

interface Filters {
  status?: OfferStatus;
}

const getStatusLabel = (offerStatus: OfferStatus): JSX.Element => {
  const map = {
    failed: {
      text: 'Cancelled',
      color: 'error'
    },
    completed: {
      text: 'Finished',
      color: 'success'
    },
    pending: {
      text: 'Current',
      color: 'info'
    }
  };

  const { text, color }: any = map[offerStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (offers: Offers[], filters: Filters): Offers[] => {
  return offers.filter((offers) => {
    let matches = true;

    if (filters.status && offers.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  offers: Offers[],
  page: number,
  limit: number
): Offers[] => {
  return offers.slice(page * limit, page * limit + limit);
};

const OffersList: FC<OfferListProps> = ({ offers }) => {
  const [selectedOffers, setSelectedOffers] = useState<string[]>([]);
  const selectedBulkActions = selectedOffers.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'finished',
      name: 'Finished'
    },
    {
      id: 'current',
      name: 'Current'
    },
    {
      id: 'cancelled',
      name: 'Cancelled'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllOffers = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedOffers(
      event.target.checked ? offers.map((offers) => offers.id) : []
    );
  };

  const handleSelectOneOffer = (
    event: ChangeEvent<HTMLInputElement>,
    offerId: string
  ): void => {
    if (!selectedOffers.includes(offerId)) {
      setSelectedOffers((prevSelected) => [...prevSelected, offerId]);
    } else {
      setSelectedOffers((prevSelected) =>
        prevSelected.filter((id) => id !== offerId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredOffers = applyFilters(offers, filters);
  const paginatedOffers = applyPagination(filteredOffers, page, limit);
  const selectedSomeOffers =
    selectedOffers.length > 0 && selectedOffers.length < offers.length;
  const selectedAllOffers = selectedOffers.length === offers.length;
  const theme = useTheme();

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
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Current offers"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllOffers}
                  indeterminate={selectedSomeOffers}
                  onChange={handleSelectAllOffers}
                />
              </TableCell>
              <TableCell />
              <TableCell>Title</TableCell>
              <TableCell>Organizer</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Min age</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right" />
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOffers.map((offer) => {
              const isCryptoOrderSelected = selectedOffers.includes(offer.id);
              return (
                <TableRow hover key={offer.id} selected={isCryptoOrderSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneOffer(event, offer.id)
                      }
                      value={isCryptoOrderSelected}
                    />
                  </TableCell>
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
                      {offer.orderDetails}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(offer.orderDate, 'dd MMMM yyyy')}
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
                      {offer.orderID}
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
                      {offer.sourceName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {offer.sourceDesc}
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
                      {offer.amountCrypto}
                      {offer.cryptoCurrency}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(offer.amount).format(`${offer.currency}0,0.00`)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {getStatusLabel(offer.status)}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      sx={{ margin: 1 }}
                      color="primary"
                      component={RouterLink}
                      to="/offers/offerDetails"
                    >
                      Offer details
                    </Button>
                  </TableCell>
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
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Offer" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
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
          count={filteredOffers.length}
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
