import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
  TextField
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

function ChangePasswordTab() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={9}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h3" gutterBottom>
                Change your password
              </Typography>
            </Box>
            <Button variant="text" startIcon={<EditTwoToneIcon />}>
              Change password
            </Button>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Box px={3} pb={2}>
              <Box p={1}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  Your current password
                </Typography>
                <TextField
                  required
                  id="outlined-required"
                  label="Required"
                  sx={{ minWidth: 400 }}
                />
              </Box>
              <Box p={1}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  New password
                </Typography>
                <TextField
                  required
                  id="outlined-required"
                  label="Required"
                  type="email"
                  sx={{ minWidth: 400 }}
                />
              </Box>
              <Box p={1}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  Repeted new password
                </Typography>
                <TextField
                  required
                  id="outlined-required"
                  label="Required"
                  sx={{ minWidth: 400 }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ChangePasswordTab;
