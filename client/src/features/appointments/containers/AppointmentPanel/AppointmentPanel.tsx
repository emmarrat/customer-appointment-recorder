import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectAppointments } from '../../appointmentsSlice';
import { selectUser } from '../../../users/usersSlice';
import { fetchAppointments } from '../../appointmentsThunk';
import { fetchExpertByUser } from '../../../experts/expertsThunks';
import { selectOneExpert } from '../../../experts/expertsSlice';
import AppointmentTable from '../../components/AppointmentTable/AppointmentTable';

interface Props {
  who: string;
}

const AppointmentPanel: React.FC<Props> = ({ who }) => {
  const dispatch = useAppDispatch();
  const appointments = useAppSelector(selectAppointments);
  const expert = useAppSelector(selectOneExpert);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user && user.role === 'expert') {
      dispatch(fetchExpertByUser(user._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user && user.role === 'user') {
      dispatch(fetchAppointments({ params: 'client', id: user._id }));
    }
    if (expert && user && user.role === 'expert') {
      dispatch(fetchAppointments({ params: 'expert', id: expert._id }));
    }
    if (user && user.role === 'admin') {
      dispatch(fetchAppointments({}));
    }
  }, [dispatch, expert, user]);
  return <AppointmentTable appointments={appointments} role={who} />;
};

export default AppointmentPanel;
