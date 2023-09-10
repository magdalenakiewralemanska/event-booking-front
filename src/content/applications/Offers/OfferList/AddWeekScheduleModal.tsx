import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  alpha,
  styled
} from '@mui/material';
import axios from 'axios';
import { SetStateAction, useState } from 'react';
import { EventType } from 'react-hook-form';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { DatePicker } from '@mui/lab';
import {
  isBefore,
  eachDayOfInterval,
  format,
  parseISO,
  addDays,
  startOfDay,
  endOfDay
} from 'date-fns';
import React from 'react';
import { toast } from 'react-toastify';
import { Offer } from 'src/models/Offer';
import { DaySchedule } from 'src/models/DaySchedule';
import { TimePeriod } from 'src/models/TimePeriod';

const StyledSelect = styled(Select)(
  ({ theme }) => `
      max-height: ${theme.spacing(20)};
      overflow-y: auto;
    `
);

interface AddWeekScheduleProps {
  onClose: () => void;
  open: boolean;

  onSave: (weekSchedule: DaySchedule[]) => void;
}

function AddWeekScheduleModal(props: AddWeekScheduleProps) {
  const { onClose, open, onSave } = props;
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
      const daysInRange = eachDayOfInterval({
        start: startOfDay(startDate), // Start of the day
        end: endOfDay(endDate) // End of the day
      });
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

  const handleClose = () => {
    setError(''); // Clear any existing errors
    onClose(); // Call the onClose function from the parent component
  };

  const saveScheduleToDatabase = () => {
    if (!startDate) {
      toast.error('Please select a start date', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      return;
    }

    const weekSchedule: DaySchedule[] = daysInRange.map((day, index) => {
      const currentDate = addDays(startDate, index);
      const dayTimeIntervals: TimePeriod[] = timeIntervals
        .filter((interval) => interval.day === day)
        .map((interval) => {
          const { startHour, endHour } = interval;
          const formattedStartHour = startHour ? `${startHour}:00` : '';
          const formattedEndHour = endHour ? `${endHour}:00` : '';
          return {
            startHour: formattedStartHour,
            endHour: formattedEndHour
          };
        });

      return {
        date: format(currentDate, "yyyy-MM-dd'T'HH:mm:ss.SSSX"),
        workingHours: dayTimeIntervals
      };
    });

    props.onSave(weekSchedule);
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Your daily schedule</DialogTitle>
      <Grid container spacing={3}>
        <Grid xs={12} md={12} item>
          <Card
            sx={{
              px: 1
            }}
          >
            <CardContent>
              <Grid container p={2}>
                <Grid item xs={12} md={12}>
                  <Typography variant="h4" fontWeight="bold" sx={{ py: 5 }}>
                    Select your daily week schedule for current offer. Please
                    take into account that for each day of the week you can only
                    set specific time ranges once.
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
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
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
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
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
                                  timeIntervals.filter((int) => int.day === day)
                                    .length -
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
              </Grid>
              <Grid container p={2}></Grid>
              <Grid container p={4}>
                <Grid sm item>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={saveScheduleToDatabase}
                  >
                    Add offer
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default AddWeekScheduleModal;
