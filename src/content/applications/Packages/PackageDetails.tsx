import { Check, Clear } from '@mui/icons-material';
import {
  Card,
  CardHeader,
  Divider,
  Grid,
  Box,
  Typography,
  CardMedia
} from '@mui/material';

function PackageDetails() {
  return (
    <Grid item xs={12} mt={3}>
      <Card>
        <CardHeader title="Package details" />
        <Divider />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          p={3}
        >
          <Grid item xs={12} md={6}>
            <Card>
              <Box pl={2} pr={2}>
                <Typography variant="h3" fontWeight="bold" sx={{ py: 2 }}>
                  Secret Garden
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  Description:
                </Typography>
                <Typography variant="h4" fontWeight="bold" sx={{ py: 2 }}>
                  Behind the seven mountains, behind the seven forests in the
                  kingdom of Loopy's World lived a gardener. He decided to
                  create a garden where everyone could feel good. Unfortunately,
                  the evil elf decided to close the entrance to the garden and
                  hide the key. Try to find the lost key together and enter the
                  garden so that joy and fun reign again!
                </Typography>
              </Box>

              <Grid container direction="row" alignItems="stretch">
                <Box pl={2} justifyContent={'left'}>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    Price:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal">
                    Duration:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    Maximal amount of people:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal">
                    Is own food available:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    Is own drink available:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal">
                    Specials:
                  </Typography>
                </Box>
                <Box pl={5} justifyContent={'right'}>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    150 $
                  </Typography>
                  <Typography variant="h4" fontWeight="normal">
                    3 hours
                  </Typography>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    10
                  </Typography>
                  <Box>
                    <Check></Check> <Clear></Clear>
                  </Box>
                  <Box sx={{ py: 1 }}>
                    <Check></Check> <Clear></Clear>
                  </Box>
                  <Typography variant="h4" fontWeight="normal">
                    Birthday entertainer
                  </Typography>
                </Box>
              </Grid>
              <Box p={2}>
                <Typography variant="h4" fontWeight="bold">
                  Other details:
                </Typography>
                <Typography variant="h4" fontWeight="bold" sx={{ py: 2 }}>
                  booking one of the 4 birthday rooms, a warm snack and a drink
                  for each guest (chosen from the birthday menu), booking a
                  table in the Loopy's restaurant for the parents/keepers, gift
                  for the birthday boy/girl
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                sx={{ minHeight: 480 }}
                image="/static/images/kid.jpg"
                title="Update"
              />
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default PackageDetails;
