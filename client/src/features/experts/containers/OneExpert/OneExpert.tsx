import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchExpertById } from '../../../../dispatchers/experts/expertsThunks';
import { fetchServiceHoursForExpert } from '../../../../dispatchers/serviceHours/serviceHoursThunks';
import {
  selectExpertOneFetching,
  selectOneExpert,
} from '../../../../dispatchers/experts/expertsSlice';
import { selectDatetimes } from '../../../../dispatchers/serviceHours/serviceHoursSlice';
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
import { createAppointment } from '../../../../dispatchers/appointemtns/appointmentsThunk';
import AppointmentMessage from '../../../appointments/components/AppointmentMessage/AppointmentMessage';
import { styles } from './OneExpertStyles';
import { selectUser } from '../../../../dispatchers/users/usersSlice';
import LoadingButton from '@mui/lab/LoadingButton';
import { selectAppointmentCreating } from '../../../../dispatchers/appointemtns/appointmentsSlice';
import { motion } from 'framer-motion';

const OneExpert = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const expert = useAppSelector(selectOneExpert);
  const workingDates = useAppSelector(selectDatetimes);
  const loading = useAppSelector(selectExpertOneFetching);
  const user = useAppSelector(selectUser);
  const appointmentLoading = useAppSelector(selectAppointmentCreating);
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState<ServicesFull | null>(
    null,
  );
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
          <Grid container justifyContent="center" mt={5}>
            <CircularProgress />
          </Grid>
        ) : (
          expert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  delay: 0.5,
                  duration: 0.75,
                },
              }}
            >
              <Grid
                padding={{ xs: '10px 20px', md: '15px 50px' }}
                sx={{ width: '100%' }}
              >
                <Button onClick={goBack}>Назад</Button>
                <Grid
                  sx={styles.columnContainer}
                  padding={{ xs: 0, sm: '0 20px', md: '0 50px' }}
                  mb={4}
                >
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
                    <Grid item container gap={2} mt={3}>
                      {expert.services.map((service) => (
                        <Grid
                          key={service._id}
                          item
                          container
                          justifyContent="space-between"
                          alignItems="center"
                          gap={1}
                        >
                          <Grid
                            item
                            container
                            alignItems="center"
                            gap={1}
                            xs={12}
                            md={8}
                          >
                            <Grid
                              item
                              sm={2}
                              md={1}
                              display={{ xs: 'none', sm: 'block' }}
                            >
                              <Avatar sx={{ bgcolor: 'primary.light' }}>
                                <LoyaltyIcon />
                              </Avatar>
                            </Grid>
                            <Grid
                              item
                              container
                              justifyContent="space-between"
                              xs={12}
                              sm={8}
                              md={10}
                            >
                              <Typography variant="body1">
                                {service.name}
                              </Typography>
                              <Typography>{`${service.price} сом`}</Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            container
                            xs={12}
                            md={3}
                            justifyContent={{ xs: 'center', md: 'flex-end' }}
                          >
                            <Button
                              className="btn"
                              sx={styles.serviceBtn}
                              onClick={() => addServiceState(service)}
                              disabled={selectedServices !== null || !user}
                            >
                              Выбрать
                              <LocalMallRoundedIcon sx={styles.serviceIcon} />
                            </Button>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item width="100%">
                    <Divider sx={styles.divider} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      fontSize={{ xs: '14px', md: '18px' }}
                    >
                      {expert.info}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </motion.div>
          )
        )}
      </Grid>
      <MyModal open={open} handleClose={closeAll}>
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
            <DateCalendar
              value={value}
              onChange={(newDate) => onDateChange(newDate)}
              sx={styles.calendar}
            />
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
                          checked={
                            selectedTime?.startTime === hour.startTime ?? false
                          }
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
          <LoadingButton
            loading={appointmentLoading}
            fullWidth
            variant="outlined"
            onClick={submitAppointment}
          >
            Подтвердить запись
          </LoadingButton>
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
