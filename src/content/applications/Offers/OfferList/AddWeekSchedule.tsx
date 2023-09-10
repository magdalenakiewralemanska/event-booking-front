import { DatePicker } from '@mui/lab';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled
} from '@mui/material';
import { eachDayOfInterval, format, isBefore } from 'date-fns';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { DaySchedule } from 'src/models/DaySchedule';
import { TimePeriod } from 'src/models/TimePeriod';

const StyledSelect = styled(Select)(
  ({ theme }) => `
      max-height: ${theme.spacing(20)};
      overflow-y: auto;
    `
);

function AddWeekSchedule({ onAddWeekSchedule }) {
  const [error, setError] = useState<string>('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [timeIntervals, setTimeIntervals] = useState([]);

  const handleStartDateChange = (date) => {
    if (date && !isBefore(date, new Date())) {
      if (endDate && !isBefore(date, endDate)) {
        toast.error('Start date cannot be later than end date', {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
        setStartDate(date);
      }
    } else {
      setStartDate(null);
    }
  };

  const handleEndDateChange = (date) => {
    if (date && !isBefore(date, new Date())) {
      if (startDate && isBefore(startDate, date)) {
        setEndDate(date);
      } else {
        toast.error('End date must be later than the start date', {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
    } else {
      setEndDate(null);
    }
  };

  const disabledDates = (date) => isBefore(date, new Date());

  const getDaysInRange = () => {
    if (startDate && endDate && isBefore(startDate, endDate)) {
      const daysInRange = eachDayOfInterval({ start: startDate, end: endDate });
      const uniqueWeekdays = Array.from(
        new Set(daysInRange.map((day) => format(day, 'EEEE')))
      );
      return uniqueWeekdays;
    }
    return [];
  };

  const daysInRange = getDaysInRange();

  const addTimeInterval = (day) => {
    const index = timeIntervals.filter(
      (interval) => interval.day === day
    ).length;
    setTimeIntervals((prevIntervals) => [
      ...prevIntervals,
      { day, startHour: '', endHour: '', index }
    ]);
  };

  const handleStartHourChange = (day, index, event) => {
    const newIntervals = [...timeIntervals];
    const selectedHour = event.target.value.split(':')[0];

    if (index > 0) {
      const previousEndHour = newIntervals.find(
        (interval) => interval.day === day && interval.index === index - 1
      ).endHour;

      if (Number(selectedHour) <= Number(previousEndHour.split(':')[0])) {
        toast.error('Start hour must be later than the previous end hour', {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        return;
      }
    }
    newIntervals.find(
      (interval) => interval.day === day && interval.index === index
    ).startHour = `${selectedHour}:00`;
    setTimeIntervals(newIntervals);
  };

  const handleEndHourChange = (day, index, event) => {
    const newIntervals = [...timeIntervals];
    const selectedHour = event.target.value.split(':')[0];
    const intervalToUpdate = newIntervals.find(
      (interval) => interval.day === day && interval.index === index
    );
    const startHour = intervalToUpdate.startHour.split(':')[0];
    const previousStartHour = newIntervals
      .find((interval) => interval.day === day && interval.index === index - 1)
      ?.startHour?.split(':')[0];

    if (previousStartHour && Number(selectedHour) < Number(previousStartHour)) {
      toast.error(
        'End hour must be later than start hour of the previous interval',
        {
          position: toast.POSITION.BOTTOM_RIGHT
        }
      );
      return;
    }

    if (Number(selectedHour) > Number(startHour)) {
      intervalToUpdate.endHour = `${selectedHour}:00`;
      setTimeIntervals(newIntervals);
    } else {
      toast.error('End hour must be later than start hour', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  };

  const hourOptions = Array.from({ length: 24 }, (_, index) => {
    const hour = index.toString().padStart(2, '0');
    return { value: `${hour}:00`, label: `${hour}:00` };
  });

  const addWeekSchedule = () => {
    const newWeekSchedule: DaySchedule[] = daysInRange.map((day) => {
      const dayTimeIntervals: TimePeriod[] = timeIntervals
        .filter((interval) => interval.day === day)
        .map((interval) => ({
          startHour: interval.startHour,
          endHour: interval.endHour
        }));

      return {
        date: startDate.toISOString, // The selected date for the day
        workingHours: dayTimeIntervals // The list of time intervals for the day
      };
    });
    onAddWeekSchedule(newWeekSchedule);
  };

  return (
    <Grid item xs={12} md={12}>
      <Typography variant="h4" fontWeight="bold" sx={{ py: 5 }}>
        Select your daily week schedule for current offer. Please take into
        account that for each day of the week you can only set specific time
        ranges once.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} pb={3}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            renderInput={(params) => <TextField {...params} />}
            shouldDisableDate={disabledDates}
          />
        </Grid>
        <Grid item xs={6} pb={3}>
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
            renderInput={(params) => <TextField {...params} />}
            shouldDisableDate={disabledDates}
          />
        </Grid>
      </Grid>

      {daysInRange.map((day) => (
        <Box key={day} mb={2}>
          <Typography variant="h6" fontWeight="bold" sx={{ pb: 1 }}>
            {day}
          </Typography>
          <Grid container spacing={2}>
            <Grid item display="flex" flexWrap={'wrap'}>
              {timeIntervals
                .filter((interval) => interval.day === day)
                .map((interval, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mx: 1,
                          color: 'gray'
                        }}
                      >
                        |
                      </Box>
                    )}
                    <Box gap={3}>
                      <StyledSelect
                        id={`startHour-${day}-${index}`}
                        value={interval.startHour}
                        onChange={(event) =>
                          handleStartHourChange(day, index, event)
                        }
                        sx={{ p: 1 }}
                        MenuProps={
                          {
                            anchorOrigin: {
                              vertical: 'bottom',
                              horizontal: 'left'
                            },
                            transformOrigin: {
                              vertical: 'top',
                              horizontal: 'left'
                            },
                            PaperProps: {
                              style: {
                                maxHeight: 200
                              }
                            }
                          } as any
                        } // Cast MenuProps to 'any'
                      >
                        {hourOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </StyledSelect>
                    </Box>
                    <Box>
                      <StyledSelect
                        id={`endHour-${day}-${index}`}
                        value={interval.endHour}
                        onChange={(event) =>
                          handleEndHourChange(day, index, event)
                        }
                        sx={{ p: 1 }}
                        MenuProps={
                          {
                            anchorOrigin: {
                              vertical: 'bottom',
                              horizontal: 'left'
                            },
                            transformOrigin: {
                              vertical: 'top',
                              horizontal: 'left'
                            },
                            PaperProps: {
                              style: {
                                maxHeight: 200
                              }
                            }
                          } as any
                        } // Cast MenuProps to 'any'
                      >
                        {hourOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </StyledSelect>
                    </Box>
                  </React.Fragment>
                ))}
              <Button
                variant="outlined"
                onClick={() => addTimeInterval(day)}
                disabled={timeIntervals.some(
                  (interval) =>
                    interval.day === day &&
                    interval.index ===
                      timeIntervals.filter((int) => int.day === day).length -
                        1 &&
                    (!interval.startHour || !interval.endHour)
                )}
              >
                Add Interval
              </Button>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Grid>
  );
}

export default AddWeekSchedule;
