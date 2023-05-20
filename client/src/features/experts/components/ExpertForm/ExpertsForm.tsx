import React, { ChangeEvent, useEffect, useState } from 'react';
import { ExpertMutation, ValidationError } from '../../../../types';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectUsers } from '../../../users/usersSlice';
import { fetchBasicUsers } from '../../../users/usersThunks';
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import FileInput from '../../../../components/UI/FileInput/FileInput';
import { fetchCategories } from '../../../categories/categoriesThunks';
import { selectCategories } from '../../../categories/categoriesSlice';

interface Props {
  onSubmit: (teacher: ExpertMutation) => void;
  existingExpert?: ExpertMutation;
  isEdit?: boolean;
  loading: boolean;
  error: ValidationError | null;
  expertName?: string;
}

const initialState: ExpertMutation = {
  user: '',
  category: '',
  title: '',
  info: '',
  photo: null,
  services: [{ name: '', price: '' }],
};

const ExpertsForm: React.FC<Props> = ({
  onSubmit,
  existingExpert,
  loading,
  isEdit,
  error,
  expertName,
}) => {
  const dispatch = useAppDispatch();
  const basicUsers = useAppSelector(selectUsers);
  const categories = useAppSelector(selectCategories);

  const [state, setState] = useState<ExpertMutation>(existingExpert || initialState);

  useEffect(() => {
    dispatch(fetchBasicUsers());
    dispatch(fetchCategories());
  }, [dispatch]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
    await onSubmit(state);
    // setState(initialState);
  };

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  const handleServicesChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const { name, value } = event.target;
    setState((prevState) => {
      const services = [...prevState.services];
      services[index] = { ...services[index], [name]: value };
      return { ...prevState, services: services };
    });
  };

  const addService = () => {
    setState((prevState) => {
      return {
        ...prevState,
        services: [...prevState.services, { name: '', price: '' }],
      };
    });
  };

  const removeService = (index: number) => {
    setState((prevState) => {
      const services = [...prevState.services];
      services.splice(index, 1);
      return { ...prevState, services };
    });
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="h4" fontSize={{ xs: '18px', md: '22px' }}>
            {isEdit ? 'Редактировать' : 'Добавить'} мастера {expertName}
          </Typography>
        </Grid>
        {!isEdit && (
          <Grid item xs={12}>
            <TextField
              label="Выберите пользователя"
              select
              name="user"
              value={state.user}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('user'))}
              helperText={getFieldError('user')}
              required
            >
              <MenuItem value="" disabled>
                Пожалуйста, выберите пользователя
              </MenuItem>
              {basicUsers.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.firstName} {user.lastName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            label="Выберите категорию"
            select
            name="category"
            value={state.category}
            onChange={inputChangeHandler}
            error={Boolean(getFieldError('category'))}
            helperText={getFieldError('category')}
            required
          >
            <MenuItem value="" disabled>
              Пожалуйста, выберите категорию
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs>
          <TextField
            variant="outlined"
            label="Укажите название специальности"
            name="title"
            value={state.title}
            onChange={inputChangeHandler}
            autoComplete="new-title"
            error={Boolean(getFieldError('title'))}
            helperText={getFieldError('title')}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="Укажите общую информацию о мастере"
            name="info"
            value={state.info}
            onChange={inputChangeHandler}
            autoComplete="new-info"
            error={Boolean(getFieldError('info'))}
            helperText={getFieldError('info')}
            multiline
            rows={3}
            required
          />
        </Grid>
        <Grid item>
          <FileInput
            label="Выберете фотографию мастера"
            onChange={fileInputChangeHandler}
            name="photo"
            type="image/*"
            errorCheck={getFieldError}
          />
        </Grid>
        <Typography variant="h6" textAlign="center" mt={2}>
          Услуги и цены
        </Typography>
        {state.services.map((service, index) => (
          <Grid
            item
            container
            key={index}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                label="Название услуги"
                name="name"
                value={service.name}
                onChange={(event) => handleServicesChange(event, index)}
                autoComplete="new-services"
                error={Boolean(getFieldError(`services.${index}.name`))}
                helperText={getFieldError(`services.${index}.name`)}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                variant="outlined"
                label="Цена"
                type="number"
                name="price"
                value={service.price}
                onChange={(event) => handleServicesChange(event, index)}
                autoComplete="new-services"
                error={Boolean(getFieldError(`services.${index}.price`))}
                helperText={getFieldError(`services.${index}.price`)}
                required
              />
            </Grid>
            <Grid item xs={12} md={1}>
              <Button
                variant="contained"
                color="error"
                onClick={() => removeService(index)}
              >
                Удалить
              </Button>
            </Grid>
          </Grid>
        ))}
        <Grid item>
          <Button variant="contained" color="primary" onClick={addService}>
            Добавить услугу
          </Button>
        </Grid>
        <Grid item container justifyContent="center" width="100%">
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={loading}
            fullWidth
            sx={{ padding: '10px 0', fontWeight: '700' }}
          >
            Подтвердить
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ExpertsForm;
