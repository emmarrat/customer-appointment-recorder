import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
  Button,
  Grid,
  IconButton,
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  selectExpertRemoving,
  selectExperts,
  selectExpertsCount,
  selectExpertsPage,
} from '../../../../dispatchers/experts/expertsSlice';
import {
  deleteExpert,
  fetchExperts,
} from '../../../../dispatchers/experts/expertsThunks';

const ExpertAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const experts = useAppSelector(selectExperts);
  const deleting = useAppSelector(selectExpertRemoving);
  const currentPage = useAppSelector(selectExpertsPage);
  const totalCount = useAppSelector(selectExpertsCount);
  const [limit, setLimit] = React.useState(5);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    dispatch(fetchExperts({ page, limit }));
  }, [dispatch, page, limit]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Подтвердите удаление мастера')) {
      await dispatch(deleteExpert(id));
      await dispatch(fetchExperts({ page, limit }));
    }
  };

  const openOneTeacher = (id: string) => {
    void navigate(`experts/${id}`);
  };

  return (
    <>
      <Grid container spacing={2} direction="column">
        <Grid item container xs justifyContent="space-between">
          <Grid item>
            <Typography variant="h4">Мастера</Typography>
          </Grid>
          <Grid item>
            <Button
              component={RouterLink}
              to="/admin/experts/new"
              color="primary"
              variant="contained"
            >
              Добавить нового мастера
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ width: '100%' }}>
                  <TableCell>Мастера</TableCell>
                  <TableCell>Специальность</TableCell>
                  <TableCell align="right">Изменить</TableCell>
                  <TableCell align="right">Удалить</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {experts.map((expert) => (
                  <TableRow key={expert._id} hover>
                    <TableCell
                      sx={{ cursor: 'pointer' }}
                      onClick={() => openOneTeacher(expert._id)}
                    >
                      {expert.user?.firstName} {expert.user?.lastName}
                    </TableCell>
                    <TableCell sx={{ cursor: 'pointer' }}>
                      {expert.title}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={RouterLink}
                        to={`/admin/experts/edit/${expert._id}`}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleDelete(expert._id)}
                        disabled={deleting === expert._id}
                      >
                        <DeleteIcon />
                      </IconButton>
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
                    onRowsPerPageChange={(e) =>
                      setLimit(parseInt(e.target.value))
                    }
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

export default ExpertAdmin;
