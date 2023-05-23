import {
  Card,
  CardHeader,
  Divider,
  Grid,
  Box,
  Typography,
  CardMedia
} from '@mui/material';

function OfferDescription() {
  return (
    <Grid item xs={12} mt={3}>
      <Card>
        <CardHeader title="Offer details" />
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
                  Your Best Birthday Party
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  Why at Loopy's?{' '}
                </Typography>
                <Typography variant="h4" fontWeight="bold" sx={{ py: 2 }}>
                  An opportunity for crazy fun in the largest Family
                  Entertainment Center in Poland. The price of each package
                  includes a warm and nutritious snack for children. You can
                  choose a menu from the available list of dishes that we
                  prepare on site, just before the party. Time together in the
                  birthday room during a snack and a ceremonial toast with a
                  cake and candles. A gift from Loopy's for the birthday boy. 4
                  birthday adventure themes to choose from. All of them are
                  adapted to the age of the birthday boy and his guests. A
                  simple way to book online - without leaving home, without
                  complications and unnecessary formalities. You choose what you
                  want and we organize it. A table for parents and adult guests
                  in the restaurant where they can spend time talking and having
                  fun with aromatic coffee and home-made pastries.
                </Typography>
              </Box>

              <Grid container direction="row" alignItems="stretch">
                <Box pl={2} justifyContent={'left'}>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    Organizer:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal">
                    Minimal age:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    Maximal age:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal">
                    Phone number:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    Address:
                  </Typography>
                </Box>
                <Box pl={5} justifyContent={'right'}>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    Loopy's World
                  </Typography>
                  <Typography variant="h4" fontWeight="normal">
                    3
                  </Typography>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    99
                  </Typography>
                  <Typography variant="h4" fontWeight="normal">
                    222-222-222
                  </Typography>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    Vivaldiego 15/2, 50-555 Wrocław
                  </Typography>
                </Box>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                sx={{ minHeight: 480 }}
                image="/static/images/balls.jpg"
                title="Update"
              />
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default OfferDescription;
