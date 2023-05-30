import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { welcomeBlockStyle } from './StaticComponentsStyles';
import { Link as RouterLink } from 'react-router-dom';
import theme from '../../theme';
import { COMPANY_TITLE } from '../../constants';

const WelcomeBlock = () => {
  return (
    <Grid
      container
      sx={welcomeBlockStyle.welcomeBlock}
      height={welcomeBlockStyle.height}
      padding={welcomeBlockStyle.padding}
    >
      <Grid item container justifyContent="center" direction="column">
        <Typography
          textAlign="left"
          variant="h1"
          sx={welcomeBlockStyle.title}
          fontSize={welcomeBlockStyle.fontSize}
          maxWidth={welcomeBlockStyle.maxWidth}
          color="#fff"
        >
          {`Добро пожаловать на сервис оказания beauty услуг "${COMPANY_TITLE}"`}{' '}
          <br />
          Мы предоставляем широкий и качественный спектр услуг
        </Typography>
        <Grid item container justifyContent="center" mt={3}>
          <Button
            component={RouterLink}
            to={`/about`}
            sx={{
              display: 'block',
              color: theme.palette.info.main,
              borderColor: theme.palette.info.main,
            }}
            variant="outlined"
          >
            Узнать больше
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WelcomeBlock;
