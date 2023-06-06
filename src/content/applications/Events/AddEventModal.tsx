import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  alpha,
  styled
} from '@mui/material';
import axios from 'axios';
import { SetStateAction, useState } from 'react';
import PropTypes from 'prop-types';
import { EventType } from 'react-hook-form';

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
      width: ${theme.spacing(38.5)};
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
        width: ${theme.spacing(37.5)};
      }
  `
);

function AddEventModal(props) {
  const { onClose, open } = props;
  const [eventName, setEventName] = useState('');
  const [events, setEvents] = useState<EventType[]>([]);
  const [error, setError] = useState<string>('');

  const handleClose = () => {
    onClose(eventName);
  };

  const handleAddEvent = () => {
    const newEvent = {
      name: eventName
    };
    if (eventName.length < 3) {
      setError('Event name must have at least three letters');
      return;
    }
    if (!/^[a-zA-Z0-9\s,.\!?]+$/.test(eventName)) {
      setError('Event name can only contain letters and numbers');
      return;
    }
    axios
      .post<EventType>(`${process.env.REACT_APP_API_URL}/events`, newEvent)
      .then((response) => {
        console.log('Event added successfully');
        setEvents((prevEvents) => [...prevEvents, response.data]);
        handleClose();
      })
      .catch((error) => {
        console.error('Error adding event:', error);
      });
  };

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setEventName(event.target.value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add new event type</DialogTitle>
      <Grid container spacing={3}>
        <Grid xs={12} md={12} item>
          <Card
            sx={{
              px: 1
            }}
          >
            <CardContent>
              <AvatarWrapper>
                <img alt="" src="/static/images/birthday.jpg" />
              </AvatarWrapper>
              <Box
                sx={{
                  pt: 3
                }}
              >
                <Grid container spacing={2} p={2}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Event Name"
                    fullWidth
                    value={eventName}
                    onChange={handleInputChange}
                    error={!!error}
                    helperText={error}
                  />
                </Grid>
                <Grid container spacing={3} p={4}>
                  <Grid sm item>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleAddEvent}
                    >
                      Add event
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Dialog>
  );
}

AddEventModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};
export default AddEventModal;
