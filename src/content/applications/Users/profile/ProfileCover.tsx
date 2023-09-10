import {
  Box,
  Typography,
  Card,
  Avatar,
  CardMedia,
  Grid,
  Divider,
  CardHeader
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { User } from 'src/models/User';

interface ProfileProps {
  user: User;
}

const ProfileCover = (props: ProfileProps) => {
  const { user } = props;

  const AvatarWrapper = styled(Card)(
    ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
  );

  const CardCover = styled(Card)(
    ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
  );

  return (
    <>
      <CardCover>
        <CardMedia
          image={
            user.backgroundPicturePath || '/static/images/user-background.jpg'
          }
        />
      </CardCover>
      <AvatarWrapper>
        <Avatar
          variant="rounded"
          alt={user.username}
          src={user.profilePicturePath}
        />
      </AvatarWrapper>
      <Grid container direction="row">
        <Grid item xs={12} md={12}>
          <Card>
            <CardHeader
              title="Username data:"
              sx={{
                textAlign: 'center',
                backgroundColor: 'lightgray'
              }}
            />
            <Divider />
            <Box p={2} display={'flex'}>
              <Box
                sx={{
                  minHeight: { xs: 0, md: 242 },
                  minWidth: { md: 242 }
                }}
                p={2}
              >
                <Typography variant="h4" py={1}>
                  Username:
                </Typography>
                <Typography variant="h4" py={1}>
                  First name:
                </Typography>
                <Typography variant="h4" py={1}>
                  Last name:
                </Typography>
                <Typography variant="h4" py={1}>
                  Email:
                </Typography>
                <Typography variant="h4" py={1}>
                  Phone number:
                </Typography>
              </Box>
              <Box
                sx={{
                  minHeight: { xs: 0, md: 242 }
                }}
                p={2}
              >
                <Typography
                  variant="h4"
                  align="right"
                  fontWeight="normal"
                  py={1}
                >
                  {user.username}
                </Typography>
                <Typography
                  variant="h4"
                  align="right"
                  fontWeight="normal"
                  py={1}
                >
                  {user.firstName}
                </Typography>
                <Typography
                  variant="h4"
                  align="right"
                  fontWeight="normal"
                  py={1}
                >
                  {user.lastName}
                </Typography>
                <Typography
                  variant="h4"
                  align="right"
                  fontWeight="normal"
                  py={1}
                >
                  {user.email}
                </Typography>
                <Typography
                  variant="h4"
                  align="right"
                  fontWeight="normal"
                  py={1}
                >
                  {user.phoneNumber}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileCover;
