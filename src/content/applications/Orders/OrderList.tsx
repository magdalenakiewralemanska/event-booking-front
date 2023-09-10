import { FC, useState, useEffect, useContext } from 'react';
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
import { styled } from '@mui/material/styles';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Order } from 'src/models/Order';
import { UserContext } from 'src/contexts/UserContext';

const OrderList: FC<Order[]> = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const userId = user.currentUser.id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/orders/list/${userId}`);
        const data = response.data;
        console.log(response.data);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userId]);

  const theme = useTheme();

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteOrder = async (orderId: number) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/orders/${orderId}`);
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error('Error in deleteing order: ', error);
    }
  };

  const indexOfLastItem = (page + 1) * limit;
  const indexOfFirstItem = indexOfLastItem - limit;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  const ImageWrapper = styled(Card)(
    ({ theme }) => `
      position: relative;
      display: inline-block;
      
      .MuiAvatar-root {
        width: ${theme.spacing(12)};
        height: ${theme.spacing(12)};
      }`
  );

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader title="My booking events" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>
              <TableCell>Package</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Start hour</TableCell>
              <TableCell>End hour</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="right" />
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((order) => {
              return (
                <TableRow hover key={order.id}>
                  <TableCell>
                    <ImageWrapper>
                      <Avatar
                        variant="rounded"
                        alt={'image'}
                        src={order.offerPackage.picturePath}
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
                      {order.offer.name}
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
                      {order.offerPackage.title}
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
                      {formatDate(new Date(order.date))}
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
                      {order.startHour}
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
                      {order.endHour}
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
                      {order.offer.address.street}{' '}
                      {order.offer.address.houseNumber}/
                      {order.offer.address.apartmentNumber
                        ? `/${order.offer.address.apartmentNumber}`
                        : ''}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {order.offer.address.zipCode} {order.offer.address.city}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      sx={{ margin: 1 }}
                      color="primary"
                      component={RouterLink}
                      to={`/user/myEvents/${order.id}`}
                    >
                      Order details
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Delete Offer" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="large"
                        onClick={() => handleDeleteOrder(order.id)}
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
          count={orders.length}
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

export default OrderList;
