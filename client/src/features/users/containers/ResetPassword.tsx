import React, { useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import NoEncryptionGmailerrorredIcon from '@mui/icons-material/NoEncryptionGmailerrorred';
import LoadingButton from '@mui/lab/LoadingButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import {
  selectPasswordForgetError,
  selectPasswordForgetLoading,
} from '../../../dispatchers/users/usersSlice';
import { resetPassword } from '../../../dispatchers/users/usersThunks';
import { ResetPassword } from '../../../types';
import MyModal from '../../../components/UI/MyModal/MyModal';
import { useParams } from 'react-router-dom';

const Token = () => {
  const { token } = useParams() as { token: string };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowNewPassword] = React.useState(false);
  const togglePass = () => setShowNewPassword(!showPassword);
  const error = useAppSelector(selectPasswordForgetError);
  const loading = useAppSelector(selectPasswordForgetLoading);
  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [open, setOpen] = useState(false);

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const data: ResetPassword = {
      newPassword: password.newPassword,
      confirmPassword: password.confirmPassword,
      token: token,
    };
    await dispatch(resetPassword(data)).unwrap();
    setOpen(true);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const goLogin = () => {
    navigate('/login');
    setOpen(false);
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
            <Grid container sx={{ width: '100%' }} gap={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Введите новый пароль"
                  name="newPassword"
                  value={password.newPassword}
                  onChange={inputChangeHandler}
                  sx={{ width: '100%' }}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePass}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Подтвердите пароль"
                  name="confirmPassword"
                  value={password.confirmPassword}
                  onChange={inputChangeHandler}
                  sx={{ width: '100%' }}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePass}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
              <span>Сохранить новый пароль</span>
            </LoadingButton>
          </Box>
        </Box>
      </Container>
      <MyModal open={open} handleClose={goLogin}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography>Ваш пароль успешно обновлен!</Typography>
          <Button onClick={goLogin} sx={{ mt: 3 }}>
            Закрыть
          </Button>
        </Box>
      </MyModal>
    </>
  );
};

export default Token;
