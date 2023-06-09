import React, { useState } from 'react';
import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import FileInput from '../../../../components/UI/FileInput/FileInput';
import LoadingButton from '@mui/lab/LoadingButton';
import { CategoryMutation, ValidationError } from '../../../../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  existingCategory?: CategoryMutation;
  onSubmit: (category: CategoryMutation) => void;
  isEdit?: boolean;
  loading: boolean;
  error: ValidationError | null;
}

const initialState = {
  title: '',
  image: null,
};

const CategoriesForm: React.FC<Props> = ({
  existingCategory,
  onSubmit,
  isEdit,
  loading,
  error,
}) => {
  const navigate = useNavigate();
  const [state, setState] = useState<CategoryMutation>(
    existingCategory || initialState,
  );

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(state);
    navigate('/admin/categories');
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

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {isEdit ? 'Изменить категорию' : 'Создать новую категорию'}
        </Typography>

        <Box component="form" onSubmit={onFormSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                label="Название категории"
                name="title"
                type="text"
                autoComplete="new-title"
                value={state.title}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('email'))}
                helperText={getFieldError('email')}
                sx={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs>
              <FileInput
                label="Выберите картинку категории"
                onChange={fileInputChangeHandler}
                name="image"
                type="image/*"
                errorCheck={getFieldError}
              />
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              loading={loading}
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 2 }}
            >
              {isEdit ? 'Изменить' : 'Создать'}
            </LoadingButton>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default CategoriesForm;
