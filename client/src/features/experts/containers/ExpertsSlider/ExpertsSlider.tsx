import React, { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { block } from '../../../../stylesMui';
import Carousel from 'react-material-ui-carousel';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchExperts } from '../../../../dispatchers/experts/expertsThunks';
import { selectExperts } from '../../../../dispatchers/experts/expertsSlice';
import { styles } from './ExpertSliderStyles';
import ExpertCardBig from '../../components/ExpertCardBig/ExpertCardBig';

const ExpertsSlider = () => {
  const dispatch = useAppDispatch();
  const experts = useAppSelector(selectExperts);

  useEffect(() => {
    dispatch(fetchExperts());
  }, [dispatch]);

  return (
    <Grid
      item
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      padding={block.padding}
      sx={styles.block}
      gap={5}
    >
      <Grid item xs={12}>
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          color="info.main"
        >
          Наши мастера
        </Typography>
      </Grid>
      <Grid item container justifyContent="center" xs={12} width="100%">
        <Carousel
          animation="slide"
          swipe={true}
          duration={2000}
          indicators={true}
          navButtonsAlwaysVisible={true}
          sx={{
            width: '100%',
          }}
        >
          {experts.map((expert) => (
            <Box
              key={expert._id}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'stretch',
              }}
            >
              <ExpertCardBig expert={expert} />
            </Box>
          ))}
        </Carousel>
      </Grid>
    </Grid>
  );
};

export default ExpertsSlider;
