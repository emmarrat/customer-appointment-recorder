import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  selectDatetimeFetching,
  selectDatetimeRemoving,
  selectDatetimes,
} from '../../../../dispatchers/serviceHours/serviceHoursSlice';
import {
  createServiceHour,
  fetchServiceHoursByUser,
  removeServiceHours,
} from '../../../../dispatchers/serviceHours/serviceHoursThunks';
import { selectUser } from '../../../../dispatchers/users/usersSlice';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import MyModal from '../../../../components/UI/MyModal/MyModal';
import ServicesHoursForm from '../../components/ServicesHoursForm/ServicesHoursForm';
import { Hour, ServiceHourMutation } from '../../../../types';
import { borderRadius, boxShadow } from '../../../../stylesMui';
import { Link as RouterLink } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { selectOneExpert } from '../../../../dispatchers/experts/expertsSlice';
import { fetchExpertByUser } from '../../../../dispatchers/experts/expertsThunks';

const ServiceHourAdmin = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const workingDates = useAppSelector(selectDatetimes);
  const expert = useAppSelector(selectOneExpert);
  const [open, setOpen] = useState(false);
  const loading = useAppSelector(selectDatetimeFetching);
  const removeLoading = useAppSelector(selectDatetimeRemoving);
  useEffect(() => {
    if (user) {
      dispatch(fetchServiceHoursByUser(user._id));
      dispatch(fetchExpertByUser(user._id));
    }
  }, [dispatch, user]);

  console.log('expert = ', expert);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const onSubmitForm = async (data: ServiceHourMutation) => {
    await dispatch(createServiceHour(data)).unwrap();
    closeModal();
    if (user) {
      dispatch(fetchServiceHoursByUser(user._id));
    }
  };

  const checkStatus = (schedule: Hour[]) => {
    return schedule.some((item) => item.status);
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    if (window.confirm('Подтвердите удаление рабочего графика')) {
      await dispatch(removeServiceHours(id)).unwrap();
      await dispatch(fetchServiceHoursByUser(user._id));
    }
  };

  return (
    <>
      <Button onClick={openModal}>Добавить рабочий день</Button>
      <Grid
        container
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {loading ? (
          <CircularProgress />
        ) : workingDates.length > 0 ? (
          workingDates.map((date) => (
            <Grid
              item
              container
              justifyContent="space-between"
              mb={3}
              sx={{
                borderRadius,
                width: '65%',
                boxShadow,
                padding: '15px',
              }}
              key={date._id}
            >
              <Grid
                item
                container
                alignItems="center"
                justifyContent="center"
                xs={12}
                md={4}
                sx={{
                  borderRight: '1px solid #edf0ee',
                  borderRadius: 0,
                  paddingRight: '15px',
                }}
              >
                <Typography>
                  {dayjs(date?.date).locale('ru').format('DD MMMM YYYY')} г.
                </Typography>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    component={RouterLink}
                    to={`/expert/service-hours/update/${date._id}`}
                  >
                    Изменить
                  </Button>
                </Grid>
                {date.hours && (
                  <Grid item xs={12}>
                    <LoadingButton
                      loading={removeLoading === date._id}
                      onClick={() => handleDelete(date._id)}
                      fullWidth
                      disabled={checkStatus(date.hours)}
                    >
                      Удалить
                    </LoadingButton>
                  </Grid>
                )}
              </Grid>
              <Grid
                item
                container
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap={1}
                xs={12}
                md={8}
                sx={{
                  padding: '10px',
                }}
              >
                {date?.hours?.map((hour) => (
                  <Grid
                    item
                    container
                    width="50%"
                    justifyContent="space-between"
                    key={hour._id}
                  >
                    <Grid item>
                      <Typography>
                        {hour?.startTime} - {hour?.endTime}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        color={hour.status ? 'primary.main' : 'text.secondary'}
                        fontWeight="500"
                      >
                        {hour?.status ? 'Занято' : 'Свободно'}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography variant="h5" textAlign="center" mt={5}>
            У вас нет рабочего графика
          </Typography>
        )}
      </Grid>
      <MyModal open={open} handleClose={closeModal}>
        {expert && (
          <ServicesHoursForm onSubmit={onSubmitForm} expert={expert._id} />
        )}
      </MyModal>
    </>
  );
};
export default ServiceHourAdmin;
