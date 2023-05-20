import React, { useState } from 'react';
import { ServiceHourMutation } from '../../../../types';
import { Alert, Avatar, Box, Container, Grid, TextField } from '@mui/material';
import { useAppSelector } from '../../../../app/hooks';
import { selectDatetimeCreatingError } from '../../serviceHoursSlice';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LoadingButton from '@mui/lab/LoadingButton';

interface Props {
  onSubmit: (data: ServiceHourMutation) => void;
  expert: string;
}

const ServicesHoursForm: React.FC<Props> = ({ onSubmit, expert }) => {
  const error = useAppSelector(selectDatetimeCreatingError);
  const [state, setState] = useState<ServiceHourMutation>({
    expert: expert,
    date: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit(state);
    setState({
      expert: '',
      date: '',
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <EventNoteIcon />
        </Avatar>
        {error && (
          <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
            {error.error}
          </Alert>
        )}
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3, width: '100%' }}>
          <Grid container sx={{ width: '100%' }}>
            <Grid item xs={12}>
              <TextField
                name="date"
                type="date"
                value={state.date}
                onChange={inputChangeHandler}
                sx={{ width: '100%' }}
              />
            </Grid>
          </Grid>
          <LoadingButton
            loading={false}
            variant="contained"
            type="submit"
            sx={{ mt: 3, mb: 2 }}
            fullWidth
          >
            <span>Создать рабочий день</span>
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};

export default ServicesHoursForm;
