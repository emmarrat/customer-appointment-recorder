import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  selectAppointmentCount,
  selectAppointmentPage,
  selectAppointments,
} from '../../appointmentsSlice';
import { selectUser } from '../../../users/usersSlice';
import { fetchAppointments, updateAppointment } from '../../appointmentsThunk';
import { fetchExpertByUser } from '../../../experts/expertsThunks';
import { selectOneExpert } from '../../../experts/expertsSlice';
import AppointmentTable from '../../components/AppointmentTable/AppointmentTable';
import { UpdateAppointmentParams } from '../../../../types';

interface Props {
  who: string;
}

const AppointmentPanel: React.FC<Props> = ({ who }) => {
  const dispatch = useAppDispatch();
  const appointments = useAppSelector(selectAppointments);
  const expert = useAppSelector(selectOneExpert);
  const user = useAppSelector(selectUser);
  const currentPage = useAppSelector(selectAppointmentPage);
  const totalCount = useAppSelector(selectAppointmentCount);
  const [limit, setLimit] = React.useState(5);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    if (user && user.role === 'expert') {
      dispatch(fetchExpertByUser(user._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user && user.role === 'user') {
      dispatch(fetchAppointments({ client: user._id, page, limit }));
    }
    if (expert && user && user.role === 'expert') {
      dispatch(fetchAppointments({ expert: expert._id, page, limit }));
    }
    if (user && user.role === 'admin') {
      dispatch(fetchAppointments({ page, limit }));
    }
  }, [dispatch, expert, user, limit, page]);

  const changeStatus = async (data: UpdateAppointmentParams) => {
    await dispatch(updateAppointment(data));
    if (user && user.role === 'user') {
      dispatch(fetchAppointments({ client: user._id, page, limit }));
    }
    if (expert && user && user.role === 'expert') {
      dispatch(fetchAppointments({ expert: expert._id, page, limit }));
    }
    if (user && user.role === 'admin') {
      dispatch(fetchAppointments({ page, limit }));
    }
  };
  return (
    <AppointmentTable
      appointments={appointments}
      role={who}
      limit={limit}
      setLimit={setLimit}
      totalCount={totalCount}
      setPage={setPage}
      currentPage={currentPage}
      changeStatus={changeStatus}
    />
  );
};

export default AppointmentPanel;
