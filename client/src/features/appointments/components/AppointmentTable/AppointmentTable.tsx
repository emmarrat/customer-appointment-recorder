import React from 'react';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { Appointment } from '../../../../types';
import dayjs from 'dayjs';

interface Props {
  appointments: Appointment[];
  role: string;
  currentPage: number;
  totalCount: number;
  limit: number;
  setLimit: (number: number) => void;
  setPage: (number: number) => void;
}

const AppointmentTable: React.FC<Props> = ({
  appointments,
  role,
  limit,
  setLimit,
  totalCount,
  setPage,
  currentPage,
}) => {
  return (
    <>
      <Grid container spacing={2} direction="column">
        <Grid item container xs justifyContent="space-between">
          <Grid item>
            <Typography variant="h4">Записи</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ width: '100%' }}>
                  {(role === 'expert' || role === 'admin') && (
                    <>
                      <TableCell>Клиент</TableCell>
                      <TableCell>Email</TableCell>
                    </>
                  )}
                  {(role === 'user' || role === 'admin') && (
                    <>
                      <TableCell>Мастер</TableCell>
                      <TableCell>Специальность</TableCell>
                    </>
                  )}
                  <TableCell>Дата и время</TableCell>
                  <TableCell>Процедура</TableCell>
                  <TableCell>Стоимость</TableCell>
                  <TableCell>Статус</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment._id} hover>
                    {(role === 'expert' || role === 'admin') && (
                      <>
                        <TableCell>
                          {appointment.client.firstName} {appointment.client.lastName}
                        </TableCell>
                        <TableCell>{appointment.client.email}</TableCell>
                      </>
                    )}
                    {(role === 'user' || role === 'admin') && (
                      <>
                        <TableCell>
                          {appointment.expert.user.firstName}{' '}
                          {appointment.expert.user.lastName}
                        </TableCell>
                        <TableCell>{appointment.expert.title}</TableCell>
                      </>
                    )}
                    <TableCell>
                      {`${dayjs(appointment.date.date)
                        .locale('ru')
                        .format('DD MMMM YYYY')} | ${appointment.startTime} - ${
                        appointment.endTime
                      }`}
                    </TableCell>
                    <TableCell>{appointment.service.name}</TableCell>
                    <TableCell>{appointment.service.price} сом</TableCell>
                    <TableCell>
                      {`${
                        appointment.isApproved ? 'Подтвержден' : 'Ожидает подтвреждения'
                      }`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 15, 50]}
                    count={totalCount}
                    rowsPerPage={limit}
                    page={currentPage - 1}
                    onPageChange={(_, newPage) => setPage(newPage + 1)}
                    onRowsPerPageChange={(e) => setLimit(parseInt(e.target.value))}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default AppointmentTable;
