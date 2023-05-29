import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Grid,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';
import { COMPANY_TITLE } from '../../../constants';

const Link = styled(NavLink)({
  color: '#fff',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'none',
    color: '#dedbdb',
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: 'primary.main', padding: '15px 0' }}
    >
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            <Link to="/">{COMPANY_TITLE}</Link>
          </Typography>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="flex-end"
            xs={12}
            md={9}
          >
            <Grid item>
              <Button component={NavLink} to="/experts" color="inherit">
                Наши мастера
              </Button>
            </Grid>
            <Box
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                width: '2px',
                height: '20px',
                background: '#fff',
                borderRadius: '10px',
              }}
            />

            {user ? <UserMenu user={user} /> : <AnonymousMenu />}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
