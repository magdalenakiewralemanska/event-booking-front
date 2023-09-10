import {
  Card,
  CardHeader,
  Divider,
  Grid,
  CardContent,
  Button
} from '@mui/material';
import { useEffect, useState } from 'react';
import DayScheduleComponent from './DayScheduleComponent';
import axios from 'axios';
import { DaySchedule } from 'src/models/DaySchedule';
import { useParams } from 'react-router';
import { TimePeriod } from 'src/models/TimePeriod';
import { format, parseISO } from 'date-fns';

function WeekSchedule({
  onDateSelected
}: {
  onDateSelected: (date: string | Date, startHour: string) => void;
}): JSX.Element {
  const today: Date = new Date();
  const [startOfWeek, setStartOfWeek] = useState<Date>(getStartOfWeek(today));
  const dayInMilSec: number = 24 * 60 * 60 * 1000;
  const { offerId } = useParams();
  const [daySchedules, setDaySchedules] = useState<DaySchedule[]>([]);

  function getStartOfWeek(date: Date): Date {
    const day: number = date.getDay() || 7;
    if (day === 1) return date;
    const diff: number = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  function formatDate(date) {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, 'dd.MM.yyyy');
  }

  function generateWeekDates(startDate: Date): {
    date: Date | string;
    disabled: boolean;
    workingHours: TimePeriod[];
  }[] {
    const dates: {
      date: Date | string;
      disabled: boolean;
      workingHours: TimePeriod[];
    }[] = [];

    for (let i = 0; i < 7; i++) {
      const date: Date = new Date(startDate.getTime() + i * dayInMilSec);
      const formattedDate = formatDate(date);
      const disabled: boolean = date < today;
      const daySchedule = daySchedules.find(
        (daySchedule) =>
          new Date(daySchedule.date).toDateString() === date.toDateString()
      );

      if (daySchedule) {
        const workingHours = [...daySchedule.workingHours].sort(
          (a, b) =>
            new Date(`1970-01-01 ${a.startHour}`).getTime() -
            new Date(`1970-01-01 ${b.startHour}`).getTime()
        );

        dates.push({ date: formattedDate, disabled, workingHours });
      } else {
        dates.push({ date: formattedDate, disabled, workingHours: [] });
      }
    }
    return dates;
  }

  useEffect(() => {
    const fetchDaySchedules = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/daySchedule/${offerId}`
        );
        const data = response.data;
        console.log(response.data);
        setDaySchedules(data);
      } catch (error) {
        console.error('Error fetching day schedules:', error);
      }
    };

    fetchDaySchedules();
  }, []);

  useEffect(() => {
    const startDate = getStartOfWeek(startOfWeek);
    const updatedWeekDates = generateWeekDates(startDate);
  }, [daySchedules, startOfWeek]);

  function handleNextWeek(): void {
    const nextWeekStartDate: Date = new Date(
      startOfWeek.getTime() + 7 * dayInMilSec
    );

    const lastWeekEndDate: Date | string =
      daySchedules[daySchedules.length - 1]?.date;

    if (
      typeof lastWeekEndDate === 'string' ||
      (lastWeekEndDate && nextWeekStartDate <= new Date(lastWeekEndDate))
    ) {
      setStartOfWeek(nextWeekStartDate);
    }
  }

  function handlePreviousWeek(): void {
    const previousWeekStartDate: Date = new Date(
      startOfWeek.getTime() - 7 * dayInMilSec
    );
    const currentWeekStartDate: Date = getStartOfWeek(today);
    if (previousWeekStartDate >= currentWeekStartDate) {
      setStartOfWeek(previousWeekStartDate);
    } else {
      setStartOfWeek(currentWeekStartDate);
    }
  }

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
          <CardContent
            sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}
          >
            <Button
              variant="contained"
              onClick={handlePreviousWeek}
              disabled={
                startOfWeek.getTime() <= getStartOfWeek(today).getTime()
              }
            >
              Previous Week
            </Button>
            <Button
              variant="contained"
              onClick={handleNextWeek}
              disabled={daySchedules.length <= 7}
            >
              Next Week
            </Button>
          </CardContent>
          <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container spacing={1}>
              {daySchedules.map((daySchedule) => {
                const date = daySchedule.date;
                const disabled: boolean = new Date(date) < today;
                const workingHours = [...daySchedule.workingHours].sort(
                  (a, b) =>
                    new Date(`1970-01-01 ${a.startHour}`).getTime() -
                    new Date(`1970-01-01 ${b.startHour}`).getTime()
                );

                return (
                  <DayScheduleComponent
                    key={date.toString()}
                    date={date}
                    dayOfWeek={typeof date === 'string' ? formatDate(date) : ''}
                    disabled={disabled}
                    workingHours={workingHours}
                    onHourSelected={(date, startHour) =>
                      onDateSelected(date, startHour)
                    }
                  />
                );
              })}
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
