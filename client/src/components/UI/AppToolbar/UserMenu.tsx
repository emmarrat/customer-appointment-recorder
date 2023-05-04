import React, { useState } from 'react';
import { User } from '../../../types';
import {Avatar, Box, Button, Menu, MenuItem} from '@mui/material';
import {Link as NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks";
import {logout} from "../../../features/users/usersThunks";
import noImageAvailable from '../../../assets/images/noImageAvailable.jpg';
import {apiURL} from "../../../constants";


interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  let cardImage = noImageAvailable;

  if (user.image !== null) {
    if(user.googleId) {
      cardImage = user.image;
    } else {
      cardImage = apiURL + '/' + user.image;
    }
  }


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleLogout =  () => {
    dispatch(logout());
    navigate('/register')
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color="inherit"
      >
        Hello, {user.displayName}
        <Avatar src={cardImage} alt={user.username} sx={{ml: 2}}/>
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={NavLink} to="/history">Tracks history</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem component={NavLink} to="/new-artist">New Artist</MenuItem>
        <MenuItem component={NavLink} to="/new-album">New Album</MenuItem>
        <MenuItem component={NavLink} to="/new-track">New Track</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;

