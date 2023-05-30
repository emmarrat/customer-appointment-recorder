import React from 'react';
import { Button, Grid, styled, Typography } from '@mui/material';
import { styles } from './ChatStyles';
import { COMPANY_TITLE } from '../../../constants';
import { Link as RouterLink } from 'react-router-dom';

const Text = styled(Typography)({
  color: '#fff',
});

const Link = styled(RouterLink)({
  color: '#fff',
  textDecoration: 'underline',
  '&:hover': {
    textDecoration: 'none',
    color: '#dedbdb',
  },
});

const ChatPreview = () => {
  return (
    <Grid container justifyContent="space-between" sx={styles.background}>
      <Grid item container direction="column" xs={12} md={6} gap={3}>
        <Grid item>
          <Typography
            variant="h4"
            sx={styles.previewTitle}
            fontSize={{ xs: '20px', md: '35px' }}
            color={{ xs: 'primary.dark', md: '#fff' }}
          >
            {COMPANY_TITLE} предлагает своим клиентам присоединиться к нашему
            Форуму!
          </Typography>
        </Grid>
        <Grid item>
          <Text variant="h5" fontSize={{ xs: '14px', md: '25px' }}>
            В нашем форуме вы можете поделиться своими впечатлениями и
            рассказать о качестве предоставляемых услуг, а также дать идеи для
            улучешния работы нашего сервиса.
          </Text>
        </Grid>
        <Grid item>
          <Text variant="h5" fontSize={{ xs: '14px', md: '25px' }}>
            Чтобы присоединиться к форуму вы должны быть{' '}
            <Link to="/register" target="_blank">
              зарегестрированы
            </Link>{' '}
            на нашем сайте, просим соблюдать уважение ко всем пользователям.
          </Text>
        </Grid>
        <Grid item>
          <Text variant="h5" fontSize={{ xs: '14px', md: '25px' }}>
            Администратор имеет право удалять сообщения в случае нарушения
            этики.
          </Text>
        </Grid>
      </Grid>
      <Grid item container alignItems="center" mt={5} xs={12} md={3}>
        <Button
          variant="contained"
          component={RouterLink}
          to="/chat"
          sx={styles.buttonLink}
        >
          Присоединиться к обсуждению
        </Button>
      </Grid>
    </Grid>
  );
};

export default ChatPreview;
