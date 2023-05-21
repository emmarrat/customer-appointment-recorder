import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectExperts } from '../../expertsSlice';
import { fetchExperts, fetchExpertsByCategory } from '../../expertsThunks';
import ExpertCard from '../../components/ExpertCard/ExpertCard';
import { useParams } from 'react-router-dom';

const Experts = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const experts = useAppSelector(selectExperts);

  useEffect(() => {
    if (id) {
      dispatch(fetchExpertsByCategory(id));
    } else {
      dispatch(fetchExperts());
    }
  }, [dispatch, id]);

  return (
    <Grid container justifyContent="center" spacing={2}>
      {experts.length > 0 &&
        experts.map((expert) => (
          <Grid
            item
            container
            justifyContent="center"
            flexWrap="wrap"
            xs={12}
            md={6}
            lg={4}
            key={expert._id}
          >
            <ExpertCard expert={expert} />
          </Grid>
        ))}
    </Grid>
  );
};

export default Experts;
