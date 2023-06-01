import React, { FC, ReactElement } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import {
  COMPANY_EMAIL,
  COMPANY_PHONE,
  COMPANY_PHONE_LINK,
} from '../../../constants';

export const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        backgroundColor: 'primary.dark',
        paddingTop: '1rem',
        paddingBottom: '1rem',
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          color="primary.light"
          spacing={2}
        >
          <Grid item>
            <Typography color="info.main">
              Данное приложение было создано усилиями{' '}
              <Typography
                component="a"
                href="https://www.linkedin.com/in/emmarrat/"
                sx={{
                  color: 'info.main',
                  textDecoration: 'none',
                }}
                target="_blank"
              >
                Эмир Марата
              </Typography>
            </Typography>
          </Grid>
          <Grid item>
            <Grid item container justifyContent="space-between" gap={2}>
              <Grid item>
                <Typography component="span" color="info.main">
                  {COMPANY_EMAIL}
                </Typography>
              </Grid>
              <Grid item>
                <MailOutlineRoundedIcon sx={{ color: 'info.main' }} />
              </Grid>
            </Grid>
            <Grid item container justifyContent="space-between" gap={2}>
              <Grid item>
                <Typography
                  component="a"
                  href={COMPANY_PHONE_LINK}
                  sx={{
                    color: 'info.main',
                    textDecoration: 'none',
                  }}
                >
                  {COMPANY_PHONE}
                </Typography>
              </Grid>
              <Grid item>
                <PhoneIphoneOutlinedIcon sx={{ color: 'info.main' }} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
