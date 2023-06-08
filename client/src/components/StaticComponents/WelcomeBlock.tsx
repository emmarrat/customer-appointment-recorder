import React from 'react';
import { Grid, Typography } from '@mui/material';
import { block } from '../../stylesMui';
import { COMPANY_TITLE } from '../../constants';
import { motion } from 'framer-motion';

const WelcomeBlock = () => {
  return (
    <Grid
      container
      sx={block.block}
      height={block.height}
      padding={block.padding}
    >
      <Grid item container justifyContent="center" direction="column">
        <motion.div
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
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
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default WelcomeBlock;
