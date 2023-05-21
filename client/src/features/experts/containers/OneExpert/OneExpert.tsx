import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchExpertById } from '../../expertsThunks';
import { fetchServiceHoursForExpert } from '../../../serviceHours/serviceHoursThunks';
import { selectExpertOneFetching, selectOneExpert } from '../../expertsSlice';
import { selectDatetimes } from '../../../serviceHours/serviceHoursSlice';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import { apiURL } from '../../../../constants';
import dayjs, { Dayjs } from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import {
  AppointmentMutation,
  Hour,
  HourMutation,
  ServiceHours,
  ServicesFull,
} from '../../../../types';
import MyModal from '../../../../components/UI/MyModal/MyModal';
import { createAppointment } from '../../../appointments/appointmentsThunk';
import AppointmentMessage from '../../../appointments/components/AppointmentMessage/AppointmentMessage';
import { styles } from './OneExpertStyles';
import { selectUser } from '../../../users/usersSlice';

const OneExpert = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const expert = useAppSelector(selectOneExpert);
  const workingDates = useAppSelector(selectDatetimes);
  const loading = useAppSelector(selectExpertOneFetching);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState<ServicesFull | null>(null);
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const [selectedDate, setSelectedDate] = useState<ServiceHours | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<HourMutation | null>(null);
  const [openCongrats, setOpenCongrats] = useState(false);

  useEffect(() => {
    dispatch(fetchExpertById(id));
    dispatch(fetchServiceHoursForExpert(id));
  }, [dispatch, id]);

  const onDateChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    if (newValue) {
      const matchingObject = workingDates.find((obj) => {
        const objDate = dayjs(obj.date).startOf('day');
        const providedDate = newValue.startOf('day');

        return objDate.isSame(providedDate);
      });
      if (matchingObject) {
        setSelectedDate(matchingObject);
      } else {
        setSelectedDate(null);
      }
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const addServiceState = (services: ServicesFull) => {
    setSelectedServices(services);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const chooseTime = (time: Hour) => {
    setSelectedTime({ startTime: time.startTime, endTime: time.endTime });
  };

  const submitAppointment = async () => {
    if (!expert || !selectedDate || !selectedServices || !selectedTime) return;
    const data: AppointmentMutation = {
      expert: expert._id,
      service: { name: selectedServices.name, price: selectedServices.price },
      date: selectedDate._id,
      startTime: selectedTime.startTime,
      endTime: selectedTime.endTime,
    };
    await dispatch(createAppointment(data)).unwrap();
    await dispatch(fetchServiceHoursForExpert(id));
    closeModal();
    setOpenCongrats(true);
  };

  const closeAll = () => {
    closeModal();
    setOpenCongrats(false);
    setSelectedTime(null);
    setSelectedDate(null);
    setSelectedServices(null);
    setValue(null);
  };

  return (
    <>
      <Grid sx={styles.container}>
        {loading ? (
          <CircularProgress />
        ) : (
          expert && (
            <Grid padding={{ xs: '10px 20px', md: '15px 50px' }} sx={{ width: '100%' }}>
              <Button onClick={goBack}>Назад</Button>
              <Grid sx={styles.columnContainer} mb={4}>
                <Grid sx={styles.container} mt={4}>
                  <Grid item>
                    <Typography variant="h6" mb={2}>
                      {expert.user.firstName} {expert.user.lastName}
                    </Typography>
                    <Typography variant="h6">{expert.title}</Typography>
                  </Grid>
                  <Grid item>
                    <Avatar
                      sx={{ width: 120, height: 120 }}
                      src={apiURL + '/' + expert.photo}
                      alt={expert.user.firstName}
                    />
                  </Grid>
                </Grid>
                <Grid item width="100%">
                  <Divider sx={styles.divider} />
                </Grid>
                <Grid item xs={12} width="100%">
                  {!user && (
                    <Typography variant="h6" textAlign="center">
                      Только авторизованные пользователи могут выбрать услугу
                    </Typography>
                  )}
                  <Typography variant="h6">Выберите услугу:</Typography>
                  <List>
                    {expert.services.map((service) => (
                      <ListItem
                        key={service._id}
                        secondaryAction={
                          <Button
                            className="btn"
                            sx={styles.serviceBtn}
                            onClick={() => addServiceState(service)}
                            disabled={selectedServices !== null || !user}
                          >
                            Выбрать
                            <LocalMallRoundedIcon sx={styles.serviceIcon} />
                          </Button>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.light' }}>
                            <LoyaltyIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={service.name}
                          secondary={service.price + ' cом'}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item width="100%">
                  <Divider sx={styles.divider} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" fontSize={{ xs: '14px', md: '18px' }}>
                    {expert.info}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )
        )}
      </Grid>
      <MyModal open={open} handleClose={closeAll} isFullWidth>
        <Typography textAlign="center" variant="h6" my={1}>
          Выбранная процедура:{' '}
          <Typography variant="h6" component="span" color="primary">
            {`"${selectedServices?.name}"`}
          </Typography>
        </Typography>
        <Typography textAlign="center" variant="h6" mb={1}>
          Когда вам будет удобно прийти?
        </Typography>
        <Box sx={styles.container}>
          <Box sx={styles.miniWrapp}>
            <DateCalendar value={value} onChange={(newDate) => onDateChange(newDate)} />
          </Box>
          <Box>
            {selectedDate !== null ? (
              selectedDate.hours.map(
                (hour) =>
                  !hour.status && (
                    <Box key={hour._id} sx={styles.miniWrapp}>
                      <Box sx={styles.miniWrapp}>
                        <Typography textAlign="center">
                          {hour.startTime} - {hour.endTime}
                        </Typography>
                        <Checkbox
                          checked={selectedTime?.startTime === hour.startTime ?? false}
                          onChange={() => chooseTime(hour)}
                        />
                      </Box>
                    </Box>
                  ),
              )
            ) : (
              <Typography textAlign="center">Нет свободных окошек </Typography>
            )}
          </Box>
        </Box>
        {selectedDate && selectedServices && selectedTime && (
          <Button fullWidth variant="outlined" onClick={submitAppointment}>
            Подтвердить запись
          </Button>
        )}
      </MyModal>
      {selectedDate && selectedTime && (
        <MyModal open={openCongrats} handleClose={closeAll}>
          <AppointmentMessage
            date={selectedDate.date}
            startDate={selectedTime.startTime}
            stayHere={closeAll}
          />
        </MyModal>
      )}
    </>
  );
};

export default OneExpert;
