import React from 'react';
import {AppBar, Grid, styled, Toolbar, Typography} from '@mui/material';
import {Link as NavLink} from 'react-router-dom';
import {useAppSelector} from "../../../app/hooks";
import {selectUser} from "../../../features/users/usersSlice";
import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonymousMenu";
import {COMPANY_TITLE} from "../../../constants";

const Link = styled(NavLink)({
  color: '#fff',
  textDecoration: 'none',
  '&:hover': {
    color: '#afaeae'
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{bgcolor: 'primary.main'}}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            <Link to="/">{COMPANY_TITLE}</Link>
          </Typography>
          <Grid item>
            {user ? (<UserMenu user={user}/> ): (<AnonymousMenu/>)}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;