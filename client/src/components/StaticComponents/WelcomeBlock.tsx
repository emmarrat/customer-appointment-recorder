import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { block } from '../../stylesMui';
import { Link as RouterLink } from 'react-router-dom';
import theme from '../../theme';
import { COMPANY_TITLE } from '../../constants';

const WelcomeBlock = () => {
  return (
    <Grid
      container
      sx={block.block}
      height={block.height}
      padding={block.padding}
    >
      <Grid item container justifyContent="center" direction="column">
        <Typography
          textAlign="left"
          variant="h2"
          sx={block.title}
          fontSize={block.fontSize}
          maxWidth={block.maxWidth}
          color="#fff"
        >
          {`Добро пожаловать на сервис оказания beauty услуг "${COMPANY_TITLE}"`}{' '}
          <br />
          Мы предоставляем широкий и качественный спектр услуг
        </Typography>
        <Grid item container justifyContent="center" my={3}>
          <Button
            component={RouterLink}
            to={`/about`}
            sx={{
              display: 'block',
              color: theme.palette.info.main,
              borderColor: theme.palette.info.main,
              fontSize: block.btnFontSize,
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
