import React, {useState} from 'react';
import {User} from '../../../types';
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {Avatar, Button, Menu, MenuItem} from '@mui/material';
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

  if (user.avatar !== null) {
    if(user.googleId) {
      cardImage = user.avatar;
    } else {
      cardImage = apiURL + '/' + user.avatar;
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
        Hello, {user.firstName}
        <Avatar src={cardImage} alt={user.firstName} sx={{ml: 2}}/>
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        {user.role === 'admin' && (
          <MenuItem component={RouterLink} to="/admin/experts">Редактировать мастеров</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default UserMenu;

