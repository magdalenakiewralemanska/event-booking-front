import {
  Box,
  Button,
  Typography,
  Card,
  Grid,
  CardContent
} from '@mui/material';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { DaySchedule } from 'src/models/DaySchedule';

interface DayScheduleComponentProps extends DaySchedule {
  onHourSelected: (date: string | Date, startHour: string) => void;
}

function DayScheduleComponent({
  date,
  workingHours,
  disabled,
  onHourSelected
}: DayScheduleComponentProps): JSX.Element {
  const hourRange: string[] = [];
  workingHours.forEach((timePeriod) => {
    const startHour = timePeriod.startHour.split(':')[0];
    const endHour = timePeriod.endHour.split(':')[0];
    for (let i = Number(startHour); i <= Number(endHour); i++) {
      hourRange.push(`${i}`);
    }
  });
  const [selectedHour, setSelectedHour] = useState<string>('');

  const handleHourClick = (hour: string): void => {
    if (selectedHour === hour) {
      setSelectedHour('');
      onHourSelected(date, '');
    } else {
      setSelectedHour(hour);
      onHourSelected(date, hour);
    }
  };

  const formattedDate = typeof date === 'string' ? parseISO(date) : date;

  return (
    <Grid xs={12} md={1.71} item>
      <Card>
        <CardContent>
          <Typography variant="h3" gutterBottom noWrap textAlign={'center'}>
            {format(formattedDate, 'dd.MM.yyyy')}
          </Typography>
          {hourRange.map((hour) => (
            <Grid sm item pb={1} key={hour}>
              <Button
                fullWidth
                variant={selectedHour === hour ? 'contained' : 'outlined'}
                onClick={() => handleHourClick(hour)}
              >
                {hour}:00
              </Button>
            </Grid>
          ))}
        </CardContent>
      </Card>
    </Grid>
  );
}
export default DayScheduleComponent;
