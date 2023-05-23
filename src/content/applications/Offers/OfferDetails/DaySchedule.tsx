import {
  Box,
  Button,
  Typography,
  Card,
  Grid,
  CardContent
} from '@mui/material';

function DaySchedule() {
  return (
    <Grid xs={12} md={1.71} item>
      <Card>
        <CardContent>
          <Box
            sx={{
              pt: 3
            }}
          >
            <Typography variant="h3" gutterBottom noWrap textAlign={'center'}>
              1 May
            </Typography>
          </Box>
          <Grid sm item pb={1}>
            <Button fullWidth variant="outlined">
              7:00
            </Button>
          </Grid>
          <Grid sm item pb={1}>
            <Button fullWidth variant="outlined">
              8:00
            </Button>
          </Grid>
          <Grid sm item pb={1}>
            <Button fullWidth variant="outlined">
              9:00
            </Button>
          </Grid>
          <Grid sm item pb={1}>
            <Button fullWidth variant="outlined">
              10:00
            </Button>
          </Grid>
          <Grid sm item pb={1}>
            <Button fullWidth variant="outlined">
              11:00
            </Button>
          </Grid>
          <Grid sm item pb={1}>
            <Button fullWidth variant="outlined">
              12:00
            </Button>
          </Grid>
          <Grid sm item pb={1}>
            <Button fullWidth variant="outlined">
              13:00
            </Button>
          </Grid>
          <Grid sm item pb={1}>
            <Button fullWidth variant="outlined">
              14:00
            </Button>
          </Grid>
          <Grid sm item pb={1}>
            <Button fullWidth variant="outlined">
              15:00
            </Button>
          </Grid>
          <Grid sm item pb={1}>
            <Button fullWidth variant="outlined">
              16:00
            </Button>
          </Grid>
          <Grid sm item pb={1}>
            <Button fullWidth variant="outlined">
              17:00
            </Button>
          </Grid>
          <Grid sm item pb={1}>
            <Button fullWidth variant="outlined">
              18:00
            </Button>
          </Grid>
          <Grid sm item pb={1}>
            <Button fullWidth variant="outlined">
              19:00
            </Button>
          </Grid>
          <Grid sm item pb={1}>
            <Button fullWidth variant="outlined">
              20:00
            </Button>
          </Grid>
          <Grid sm item pb={1}>
            <Button fullWidth variant="outlined">
              21:00
            </Button>
          </Grid>
          <Grid sm item>
            <Button fullWidth variant="outlined">
              22:00
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default DaySchedule;
