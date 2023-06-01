import React, { useState } from 'react';
import { User } from '../../../types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../../../dispatchers/users/usersThunks';
import noImageAvailable from '../../../assets/images/noImageAvailable.jpg';
import { apiURL } from '../../../constants';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  let cardImage = noImageAvailable;

  if (user.avatar !== null) {
    cardImage = apiURL + '/' + user.avatar;
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/register');
  };

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        меню
        <Avatar src={cardImage} alt={user.firstName} sx={{ ml: 2 }} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ width: '100%' }}
      >
        <MenuItem onClick={handleLogout}>Выйти</MenuItem>
        {user.role === 'admin' && (
          <MenuItem component={RouterLink} to="/admin/experts">
            Редактировать мастеров
          </MenuItem>
        )}
        {user.role === 'expert' && (
          <MenuItem component={RouterLink} to="/expert/service-hours">
            Рабочий график
          </MenuItem>
        )}
        {(user.role === 'expert' || user.role === 'user') && (
          <MenuItem
            component={RouterLink}
            to={
              user.role === 'expert' ? '/expert/appointments' : '/appointments'
            }
          >
            {user.role === 'expert' ? 'Записи клиентов' : 'Мои записи'}
          </MenuItem>
        )}
        {user.role === 'admin' && (
          <MenuItem component={RouterLink} to="/admin/appointments">
            Контроль записей
          </MenuItem>
        )}

        <MenuItem component={RouterLink} to="/chat">
          Форум
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
