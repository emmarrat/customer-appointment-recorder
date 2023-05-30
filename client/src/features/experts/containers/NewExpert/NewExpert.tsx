import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { createExpert } from '../../../../dispatchers/experts/expertsThunks';
import { ExpertMutation } from '../../../../types';
import ExpertsForm from '../../components/ExpertForm/ExpertsForm';
import {
  selectExpertCreating,
  selectExpertCreatingError,
} from '../../../../dispatchers/experts/expertsSlice';

const NewExpert = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectExpertCreatingError);
  const loading = useAppSelector(selectExpertCreating);

  const submitNewExpert = async (expert: ExpertMutation) => {
    await dispatch(createExpert(expert)).unwrap();
    navigate('/admin/experts');
  };

  return (
    <ExpertsForm loading={loading} error={error} onSubmit={submitNewExpert} />
  );
};

export default NewExpert;
