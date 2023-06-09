import React from 'react';
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Category } from '../../../../types';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  deleteCategory,
  fetchCategories,
} from '../../../../dispatchers/categories/categoriesThunks';
import { selectCategoriesRemoving } from '../../../../dispatchers/categories/categoriesSlice';

interface Props {
  categories: Category[];
}

const CategoriesTable: React.FC<Props> = ({ categories }) => {
  const dispatch = useAppDispatch();
  const deleting = useAppSelector(selectCategoriesRemoving);
  const handleDelete = async (id: string) => {
    if (window.confirm('Подтвердите удаление категории')) {
      await dispatch(deleteCategory(id));
      await dispatch(fetchCategories());
    }
  };

  return (
    <>
      <Grid container spacing={2} direction="column">
        <Grid item container xs justifyContent="space-between">
          <Grid item>
            <Typography variant="h4">Категории</Typography>
          </Grid>
          <Grid item>
            <Button
              component={RouterLink}
              to="/admin/categories/new"
              color="primary"
              variant="contained"
            >
              Добавить категорию
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ width: '100%' }}>
                  <TableCell>Категории</TableCell>
                  <TableCell align="right">Изменить</TableCell>
                  <TableCell align="right">Удалить</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category._id} hover>
                    <TableCell>{category.title}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={RouterLink}
                        to={`/admin/categories/update/${category._id}`}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleDelete(category._id)}
                        disabled={deleting === category._id}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default CategoriesTable;
