import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  alpha,
  styled
} from '@mui/material';
import axios from 'axios';
import { SetStateAction, useState } from 'react';
import { EventType } from 'react-hook-form';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { authorizedApi } from 'src/interceptor/AxiosInterceptor';

const ImageWrapper = styled(CardMedia)(
  ({ theme }) => `
    position: relative;

    .MuiAvatar-root {
      width: ${theme.spacing(40)};
      height: ${theme.spacing(25)};
    }`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
  position: absolute;
  bottom: ${theme.spacing(2)};
  right: ${theme.spacing(2)};

  .MuiIconButton-root {
    border-radius: 100%;
    background: ${theme.palette.primary.main};
    color: ${theme.palette.primary.contrastText};
    box-shadow: ${theme.colors.shadows.primary};;
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
    padding: 1;

    &:hover {
      background: ${theme.palette.primary.dark};
    }
  }
`
);

const Input = styled('input')({
  display: 'none'
});

interface AddEventModalProps {
  onClose: (eventName: string) => void;
  open: boolean;
  fetchData: () => void;
}

function AddEventModal(props: AddEventModalProps) {
  const { onClose, open, fetchData } = props;
  const [eventName, setEventName] = useState('');
  const [error, setError] = useState<string>('');
  const [picturePath, setPicturePath] = useState<string>('');

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setPicturePath(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    onClose(eventName);
  };

  const handleAddEvent = async () => {
    const newEvent = {
      name: eventName,
      picturePath: picturePath
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
      .then(() => {
        console.log('Event added successfully');
        fetchData();
        setEventName('');
        setPicturePath('');
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
              <Grid container p={2}>
                <ImageWrapper>
                  {picturePath ? (
                    <Avatar variant="rounded" alt="image" src={picturePath} />
                  ) : (
                    <Avatar
                      variant="rounded"
                      alt="image"
                      src="/static/images/employees-party.jpg"
                    />
                  )}

                  <ButtonUploadWrapper>
                    <Input
                      accept="image/*"
                      id="icon-button-file"
                      name="icon-button-file"
                      type="file"
                      onChange={handleFileInputChange}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton component="span" color="primary">
                        <UploadTwoToneIcon style={{ fontSize: '2rem' }} />
                      </IconButton>
                    </label>
                  </ButtonUploadWrapper>
                </ImageWrapper>
              </Grid>
              <Grid container p={2}>
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
              <Grid container p={4}>
                <Grid sm item>
                  <Button fullWidth variant="outlined" onClick={handleAddEvent}>
                    Add event
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default AddEventModal;
