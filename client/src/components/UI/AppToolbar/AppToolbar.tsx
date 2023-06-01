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
import { selectUser } from '../../../dispatchers/users/usersSlice';
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
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          alignItems="center"
        >
          <Typography variant="h6" component="div">
            <Link to="/">{COMPANY_TITLE}</Link>
          </Typography>
          <Grid
            item
            container
            justifyContent={{ xs: 'center', md: 'flex-end' }}
            alignItems="center"
            xs={12}
            md={9}
          >
            <Grid item container justifyContent="center" xs={12} md={'auto'}>
              <Button component={NavLink} to="/experts" color="inherit">
                Наши мастера
              </Button>
            </Grid>
            <Grid item container justifyContent="center" xs={12} md={'auto'}>
              <Button component={NavLink} to="/pre-chat" color="inherit">
                Форум
              </Button>
            </Grid>
            <Box
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
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
