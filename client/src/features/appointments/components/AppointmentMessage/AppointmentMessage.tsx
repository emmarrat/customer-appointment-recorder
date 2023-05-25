import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import {
  COMPANY_ADDRESS_LINK,
  COMPANY_ADDRESS_NAME,
} from '../../../../constants';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link as RouterLink } from 'react-router-dom';
import dayjs from 'dayjs';

interface Props {
  date: string;
  startDate: string;
  stayHere: () => void;
}

const styles = {
  wrapper: {
    mt: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 1,
  },
  text: {
    textAlign: 'center',
  },
  link: {
    textAlign: 'center',
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'primary.main',
  },
};

const AppointmentMessage: React.FC<Props> = ({ date, startDate, stayHere }) => {
  return (
    <Box sx={styles.wrapper}>
      <Box>
        <Typography sx={styles.text} fontWeight={700}>
          Спасибо за доверие!
        </Typography>
        <Typography sx={styles.text} mb={1} fontWeight={700}>
          Ваша запись находится в статусе обработки у администратора
        </Typography>
        <Typography sx={styles.text} mb={1} fontWeight={700}>
          Вы получите email с подтверждением записи, а также вы можете следить
          за статусом в личном кабинете
        </Typography>

        <Typography sx={styles.text}>
          Будем ждать вас {dayjs(date).locale('ru').format('DD MMMM YYYY')} г.,
          к {startDate}, по адресу:
        </Typography>
        <Typography
          sx={styles.link}
          component={'a'}
          href={COMPANY_ADDRESS_LINK}
          target="_blank"
          rel="noreferrer"
        >
          <LocationOnIcon fontSize="small" />
          {COMPANY_ADDRESS_NAME}
        </Typography>
      </Box>
      <Box sx={styles.wrapper}>
        <Button component={RouterLink} to="/" variant="outlined" fullWidth>
          На главную страницу
        </Button>
        <Button onClick={stayHere} variant="outlined" fullWidth>
          Продолжить просмотр услуг
        </Button>
      </Box>
    </Box>
  );
};

export default AppointmentMessage;
