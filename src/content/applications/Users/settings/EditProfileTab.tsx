import {
  Box,
  CardMedia,
  Typography,
  Card,
  CardHeader,
  Divider,
  Button,
  CardActions,
  TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';

const CardActionsWrapper = styled(CardActions)(
  ({ theme }) => `
     background: ${theme.colors.alpha.black[5]};
     padding: ${theme.spacing(3)};
`
);

function EditProfileTab() {
  const user = {
    savedCards: 7,
    username: 'Magdalena Kiewra-Lemańska',
    coverImg: '/static/images/placeholders/covers/user-background.jpg',
    avatar: '/static/images/placeholders/covers/user.jpg',
    firstName: 'Magdalena',
    lastName: 'Kiewra-Lemańska',
    email: 'magdalenazur86@gmail.com',
    phoneNumber: '111-111-111'
  };
  return (
    <Card>
      <CardHeader />
      <CardMedia
        sx={{ minHeight: 280 }}
        image="/static/images/update.jpg"
        title="Update"
      />
      <Box px={3} ml={3} mt={4}>
        <Typography variant="h3" sx={{ pb: 1 }}>
          Basic profile data:
        </Typography>
      </Box>
      <Box px={3} pb={2} display={'flex'} flexWrap={'wrap'}>
        <Box p={3}>
          <Typography variant="h4" sx={{ pb: 2 }}>
            Username
          </Typography>
          <TextField
            required
            id="outlined-required"
            label="Required"
            value={user.username}
          />
        </Box>
        <Box p={3}>
          <Typography variant="h4" sx={{ pb: 2 }}>
            Email
          </Typography>
          <TextField
            required
            id="outlined-required"
            label="Required"
            type="email"
            value={user.email}
          />
        </Box>
        <Box p={3}>
          <Typography variant="h4" sx={{ pb: 2 }}>
            First name
          </Typography>
          <TextField
            required
            id="outlined-required"
            label="Required"
            value={user.firstName}
          />
        </Box>
        <Box p={3}>
          <Typography variant="h4" sx={{ pb: 2 }}>
            Last name
          </Typography>
          <TextField
            required
            id="outlined-required"
            label="Required"
            value={user.lastName}
          />
        </Box>
        <Box p={3}>
          <Typography variant="h4" sx={{ pb: 2 }}>
            Phone number
          </Typography>
          <TextField
            id="outlined-helperText"
            label=""
            type="text"
            value="111-111-111"
          />
        </Box>
      </Box>
      <Box px={3} ml={3} mt={4}>
        <Typography variant="h3" sx={{ pb: 1 }}>
          Address data:
        </Typography>
      </Box>
      <Box px={3} pb={2} display={'flex'}>
        <Box p={3}>
          <Typography variant="h4" sx={{ pb: 2 }}>
            Street
          </Typography>
          <TextField id="outlined-helperText" label="" value="Vivaldiego" />
        </Box>
        <Box p={3}>
          <Typography variant="h4" sx={{ pb: 2 }}>
            House number
          </Typography>
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
          />
        </Box>
        <Box p={3}>
          <Typography variant="h4" sx={{ pb: 2 }}>
            Appartment number
          </Typography>
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
          />
        </Box>
        <Box p={3}>
          <Typography variant="h4" sx={{ pb: 2 }}>
            Zip-code
          </Typography>
          <TextField
            id="outlined-helperText"
            label=""
            type="zip-code"
            value="55-002"
          />
        </Box>
        <Box p={3}>
          <Typography variant="h4" sx={{ pb: 2 }}>
            City
          </Typography>
          <TextField id="outlined-helperText" label="" value="Szczecin" />
        </Box>
      </Box>
      <Divider />
      <CardActionsWrapper
        sx={{
          display: { xs: 'block', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box>
          <Button variant="contained">Save changes</Button>
          <Button variant="outlined" sx={{ mx: 2 }}>
            Delete profile
          </Button>
        </Box>
      </CardActionsWrapper>
    </Card>
  );
}

export default EditProfileTab;
