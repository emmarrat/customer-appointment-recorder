import React, { useEffect } from 'react';

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { verifyEmail } from '../../../dispatchers/users/usersThunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectUser,
  selectVerifyEmailLoading,
} from '../../../dispatchers/users/usersSlice';

const VerifyEmail = () => {
  const { token } = useParams() as { token: string };

  const verifyLoading = useAppSelector(selectVerifyEmailLoading);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    void dispatch(verifyEmail(token));
  }, [dispatch, token]);

  return (
    <>
      {verifyLoading ? (
        <CircularProgress />
      ) : (
        user &&
        user.verified && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <Container maxWidth="sm">
              <Typography variant="h4" gutterBottom textAlign="center">
                Электронная почта подтверждена
              </Typography>
              <Typography variant="body1" gutterBottom textAlign="center">
                Спасибо! Теперь вы можете пользоваться всеми функциями нашего
                сервиса.
              </Typography>
              <Box
                sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/"
                >
                  На главную страницу
                </Button>
              </Box>
            </Container>
          </Box>
        )
      )}
    </>
  );
};

export default VerifyEmail;
