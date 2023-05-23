import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Avatar,
  CardMedia,
  Button,
  IconButton,
  Grid,
  Divider,
  CardHeader
} from '@mui/material';
import { styled } from '@mui/material/styles';

import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';

const Input = styled('input')({
  display: 'none'
});

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

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
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

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

const ProfileCover = ({ user }) => {
  return (
    <>
      <CardCover>
        <CardMedia image={user.coverImg} />
        <CardCoverAction>
          <Input accept="image/*" id="change-cover" multiple type="file" />
          <label htmlFor="change-cover">
            <Button
              startIcon={<UploadTwoToneIcon />}
              variant="contained"
              component="span"
            >
              Change cover
            </Button>
          </label>
        </CardCoverAction>
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={user.username} src={user.avatar} />
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
      </AvatarWrapper>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
      >
        <Grid item xs={12} md={12}>
          <Card>
            <CardHeader title="Username data:" />
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

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};

export default ProfileCover;
