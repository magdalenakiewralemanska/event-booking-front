import {
  Button,
  Card,
  Grid,
  Box,
  CardContent,
  Typography,
  Avatar,
  alpha,
  Tooltip,
  CardActionArea,
  styled
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { NavLink as RouterLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { EventType } from '../../../models/EventType';
import axios from 'axios';
import { User } from 'src/models/User';
import AddEventModal from './AddEventModal';
import UpdateEventModal from './UpdateEventModal';
import { authorizedApi } from 'src/interceptor/AxiosInterceptor';
import { UserContext } from 'src/contexts/UserContext';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(2, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(26)};
    width: 100%;
    background: ${
      theme.palette.mode === 'dark'
        ? theme.colors.alpha.trueWhite[30]
        : alpha(theme.colors.alpha.black[100], 0.07)
    };
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(25)};
      width: 100%;
    }
`
);

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[10]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        transition: ${theme.transitions.create(['all'])};
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
          
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[70]};
        }
`
);

function Events() {
  const [events, setEvents] = useState<EventType[]>([]);
  const { currentUser } = useContext(UserContext);
  const isLoggedIn = !!currentUser;
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const handleClickAdd = () => {
    setOpenAddModal(true);
  };

  const handleCloseAdd = () => {
    setOpenAddModal(false);
  };

  const handleClickUpdate = (event: EventType) => {
    setSelectedEvent(event);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdate = () => {
    setSelectedEvent(null);
    setOpenUpdateModal(false);
  };

  const handleDeleteEvent = (event) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/events`, { data: event })
      .then(() => {
        setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
        console.log('Event deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting event: ', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/events`);
      console.log(response.data);
      setEvents(response.data);
      console.log(events);
    } catch (error) {
      console.error('Error with fetching data from database', error);
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3
        }}
      >
        <Typography variant="h2">Events</Typography>
      </Box>
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid xs={12} md={4} item key={event.id}>
            <Card
              sx={{
                px: 1
              }}
            >
              <CardContent>
                <AvatarWrapper>
                  <img alt={event.name} src={event.picturePath} />
                </AvatarWrapper>
                <Box
                  sx={{
                    pt: 3
                  }}
                >
                  <Typography
                    variant="h3"
                    gutterBottom
                    noWrap
                    textAlign={'center'}
                  >
                    {event.name}
                  </Typography>
                </Box>
                <Grid container spacing={3} p={4}>
                  <Grid sm item>
                    <Button
                      fullWidth
                      variant="outlined"
                      component={RouterLink}
                      to={`${event.id}/offers`}
                    >
                      Show Offers
                    </Button>
                  </Grid>
                  {isLoggedIn && currentUser.role === 'ADMIN' && (
                    <Grid sm item>
                      <Box
                        sx={{
                          display: { xs: 'block', md: 'flex' },
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Button
                          variant="contained"
                          onClick={() => handleClickUpdate(event)}
                        >
                          Update event
                        </Button>

                        <Button
                          variant="outlined"
                          onClick={() => handleDeleteEvent(event)}
                        >
                          Delete event
                        </Button>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {isLoggedIn && currentUser.role === 'ADMIN' && (
          <Grid xs={12} md={4} item>
            <Tooltip arrow title="Click to add a new event">
              <CardAddAction>
                <CardActionArea
                  sx={{
                    px: 1
                  }}
                >
                  <CardContent>
                    <AvatarAddWrapper>
                      <AddTwoToneIcon
                        fontSize="large"
                        onClick={handleClickAdd}
                      />
                      <AddEventModal
                        open={openAddModal}
                        onClose={handleCloseAdd}
                        fetchData={fetchData}
                      />
                      <UpdateEventModal
                        open={openUpdateModal}
                        onClose={handleCloseUpdate}
                        selectedEvent={selectedEvent}
                        fetchData={fetchData}
                      />
                    </AvatarAddWrapper>
                  </CardContent>
                </CardActionArea>
              </CardAddAction>
            </Tooltip>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default Events;
