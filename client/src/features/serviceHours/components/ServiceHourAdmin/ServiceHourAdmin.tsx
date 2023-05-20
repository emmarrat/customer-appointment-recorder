import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectDatetimeFetching, selectDatetimes } from '../../serviceHoursSlice';
import { createServiceHour, fetchServiceHoursByUser } from '../../serviceHoursThunks';
import { selectUser } from '../../../users/usersSlice';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import MyModal from '../../../../components/UI/MyModal/MyModal';
import ServicesHoursForm from '../ServicesHoursForm/ServicesHoursForm';
import { ServiceHourMutation } from '../../../../types';

const ServiceHourAdmin = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const workingDates = useAppSelector(selectDatetimes);
  const userId = useMemo(() => user?._id, [user]);
  const [open, setOpen] = useState(false);
  const [expert, setExpert] = useState('');
  const loading = useAppSelector(selectDatetimeFetching);

  useEffect(() => {
    if (userId) {
      dispatch(fetchServiceHoursByUser(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const date = workingDates.find((date) => date._id);
    if (date) {
      setExpert(date.expert);
    }
  }, [workingDates]);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const onSubmitForm = async (data: ServiceHourMutation) => {
    await dispatch(createServiceHour(data)).unwrap();
    closeModal();
    if (userId) {
      dispatch(fetchServiceHoursByUser(userId));
    }
  };

  return (
    <>
      <Button onClick={openModal}>Добавить рабочий день</Button>
      <Grid container flexDirection="column" justifyContent="center" alignItems="center">
        {loading && <CircularProgress />}
        {workingDates.map((date) => (
          <Grid
            item
            container
            justifyContent="space-between"
            mb={3}
            sx={{
              borderRadius: '20px',
              width: '65%',
              boxShadow: '2px 12px 25px #d4d4d4, -12px -12px 25px #ffffff',
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
              }}
            >
              <Typography>
                {dayjs(date.date).locale('ru').format('DD MMMM YYYY')} г.
              </Typography>
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
              {date.hours.map((hour) => (
                <Grid
                  item
                  container
                  width="50%"
                  justifyContent="space-between"
                  key={hour._id}
                >
                  <Grid item>
                    <Typography>
                      {hour.startTime} - {hour.endTime}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{hour.status ? 'Занято' : 'Свободно'}</Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
      <MyModal open={open} handleClose={closeModal}>
        <ServicesHoursForm onSubmit={onSubmitForm} expert={expert} />
      </MyModal>
    </>
  );
};
export default ServiceHourAdmin;
