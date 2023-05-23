import { Card, CardHeader, Divider, Grid, CardContent } from '@mui/material';
import DaySchedule from './DaySchedule';

function WeekSchedule() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Book the date of your event" />
          <Divider />
          <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container spacing={1}>
              <DaySchedule />
              <DaySchedule />
              <DaySchedule />
              <DaySchedule />
              <DaySchedule />
              <DaySchedule />
              <DaySchedule />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Divider />
      <Grid></Grid>
    </Grid>
  );
}

export default WeekSchedule;
