import React, { useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import NoEncryptionGmailerrorredIcon from '@mui/icons-material/NoEncryptionGmailerrorred';
import MyModal from '../../../components/UI/MyModal/MyModal';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectPasswordForgetError,
  selectPasswordForgetLoading,
} from '../../../dispatchers/users/usersSlice';
import { forgotPassword } from '../../../dispatchers/users/usersThunks';

const ForgetPassword = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectPasswordForgetError);
  const loading = useAppSelector(selectPasswordForgetLoading);
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(forgotPassword({ email })).unwrap();
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
    setEmail('');
  };

  return (
    <>
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
            <NoEncryptionGmailerrorredIcon />
          </Avatar>
          {error && (
            <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
              {error.error}
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={submitFormHandler}
            sx={{ mt: 3, width: '100%' }}
          >
            <Grid container sx={{ width: '100%' }}>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="current-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>
            <LoadingButton
              loading={loading}
              variant="contained"
              type="submit"
              sx={{ mt: 3, mb: 2 }}
              fullWidth
            >
              <span>Сбросить пароль</span>
            </LoadingButton>
          </Box>
        </Box>
      </Container>
      <MyModal open={open} handleClose={closeModal}>
        <Box>
          <Typography variant="body1" align="center" mb={2}>
            На указанный вами email: {email} было отправлено письмо для сброса
            пароля
          </Typography>
        </Box>
      </MyModal>
    </>
  );
};

export default ForgetPassword;
