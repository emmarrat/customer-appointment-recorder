import React, { useState } from 'react';
import { Hour, HourWithoutId } from '../../../../types';
import { Alert, Button, Grid, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import MyModal from '../../../../components/UI/MyModal/MyModal';
import { useAppSelector } from '../../../../app/hooks';
import {
  selectDatetimeUpdating,
  selectDatetimeUpdatingError,
} from '../../../../dispatchers/serviceHours/serviceHoursSlice';
import LoadingButton from '@mui/lab/LoadingButton';

interface Props {
  hours: Hour[];
  date: string;
  onFormSubmit: (hours: HourWithoutId[]) => void;
}

const ServiceHoursChangeForm: React.FC<Props> = ({
  hours,
  date,
  onFormSubmit,
}) => {
  const loading = useAppSelector(selectDatetimeUpdating);
  const error = useAppSelector(selectDatetimeUpdatingError);
  const [hoursState, setHoursState] = useState<Hour[]>(hours);
  const [open, setOpen] = useState(false);

  const handleAddAppointment = () => {
    setHoursState((prevAppointments) => [
      ...prevAppointments,
      { startTime: '', endTime: '', status: false, _id: String(Date.now()) },
    ]);
  };

  const handleRemoveAppointment = (id: string) => {
    if (hoursState.find((appointment) => appointment._id === id)?.status) {
      return;
    }
    setHoursState((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment._id !== id),
    );
  };

  const handleChange = (id: string, key: keyof Hour, value: string) => {
    setHoursState((prevAppointments) =>
      prevAppointments.map((appointment) => {
        if (appointment._id === id) {
          return { ...appointment, [key]: value };
        }
        return appointment;
      }),
    );
  };

  const checkDuplicateTimes = (appointments: Hour[]) => {
    const startTimeMap: { [key: string]: boolean } = {};
    const endTimeMap: { [key: string]: boolean } = {};

    for (const appointment of appointments) {
      const { startTime, endTime } = appointment;

      if (startTimeMap[startTime] || endTimeMap[endTime]) {
        return true;
      }

      startTimeMap[startTime] = true;
      endTimeMap[endTime] = true;
    }
    return false;
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const isDuplicate = checkDuplicateTimes(hoursState);
    await setOpen(isDuplicate);
    if (!isDuplicate) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      await onFormSubmit(hoursState.map(({ _id: _unusedId, ...rest }) => rest));
    }
  };

  return (
    <>
      <Typography textAlign="center" variant="h5" mb={5}>
        Рабочие часы {dayjs(date).locale('ru').format('DD MMMM YYYY')} г.
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container gap={2} mb={5}>
          {hoursState.map((appointment) => (
            <Grid item key={appointment._id}>
              <TextField
                type="time"
                label="Начало"
                required
                value={appointment.startTime}
                onChange={(e) =>
                  handleChange(appointment._id, 'startTime', e.target.value)
                }
                disabled={appointment.status}
                sx={{ mb: 1 }}
              />

              <TextField
                type="time"
                label="Конец"
                required
                value={appointment.endTime}
                onChange={(e) =>
                  handleChange(appointment._id, 'endTime', e.target.value)
                }
                disabled={appointment.status}
              />
              <Button
                onClick={() => handleRemoveAppointment(appointment._id)}
                disabled={appointment.status}
              >
                Удалить
              </Button>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          type="button"
          onClick={handleAddAppointment}
        >
          Добавить рабочий час
        </Button>
        <LoadingButton
          loading={loading}
          variant="contained"
          type="submit"
          sx={{ marginX: 1 }}
        >
          Сохранить
        </LoadingButton>
      </form>
      {error && (
        <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
          {error.error}
        </Alert>
      )}
      <MyModal open={open} handleClose={() => setOpen(false)}>
        <Grid container direction="column" gap={1}>
          <Typography textAlign="center">
            Вы указали одни те же часы более одного раза!
          </Typography>
          <Typography textAlign="center">
            Ваши рабочие часы не должны пересикаться друг c другом!
          </Typography>
          <Button onClick={() => setOpen(false)}>Исправить</Button>
        </Grid>
      </MyModal>
    </>
  );
};

export default ServiceHoursChangeForm;
