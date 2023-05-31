import React, { useEffect } from 'react';
import { Button, CircularProgress, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  fetchOneServiceHours,
  updateServiceHours,
} from '../../../../dispatchers/serviceHours/serviceHoursThunks';
import {
  selectDatetimeFetching,
  selectOneDatetime,
} from '../../../../dispatchers/serviceHours/serviceHoursSlice';
import ServiceHoursChangeForm from '../../components/ServiceHoursChangeForm/ServiceHoursChangeForm';
import { HourWithoutId } from '../../../../types';

const UpdateServiceHours = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const oneServiceHours = useAppSelector(selectOneDatetime);
  const navigate = useNavigate();
  const loading = useAppSelector(selectDatetimeFetching);

  useEffect(() => {
    dispatch(fetchOneServiceHours(id));
  }, [dispatch, id]);

  const updateHours = async (hours: HourWithoutId[]) => {
    if (!oneServiceHours) return;
    await dispatch(
      updateServiceHours({ id: oneServiceHours._id, hours }),
    ).unwrap();
    navigate('/expert/service-hours');
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Grid>
      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        oneServiceHours && (
          <Grid>
            <Button onClick={goBack}>Назад</Button>

            <ServiceHoursChangeForm
              hours={oneServiceHours.hours}
              date={oneServiceHours.date}
              onFormSubmit={updateHours}
            />
          </Grid>
        )
      )}
    </Grid>
  );
};

export default UpdateServiceHours;
