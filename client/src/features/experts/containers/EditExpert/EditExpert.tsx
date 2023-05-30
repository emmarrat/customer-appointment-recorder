import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import {
  selectExpertUpdating,
  selectExpertUpdatingError,
  selectOneExpert,
} from '../../../../dispatchers/experts/expertsSlice';
import ExpertsForm from '../../components/ExpertForm/ExpertsForm';
import { ExpertMutation } from '../../../../types';
import {
  fetchExpertById,
  updateExpert,
} from '../../../../dispatchers/experts/expertsThunks';

const EditExpert = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectExpertUpdatingError);
  const loading = useAppSelector(selectExpertUpdating);
  const expert = useAppSelector(selectOneExpert);

  useEffect(() => {
    dispatch(fetchExpertById(id));
  }, [dispatch, id]);

  const submitUpdatedExpert = async (expert: ExpertMutation) => {
    await dispatch(updateExpert({ expertData: expert, id })).unwrap();
    navigate('/admin/experts');
  };

  const existingExpert = expert && {
    user: expert.user._id,
    category: expert.category._id,
    title: expert.title,
    info: expert.info,
    photo: null,
    services: expert.services.map((service) => {
      return { name: service.name, price: service.price.toString() };
    }),
  };

  return (
    <>
      {existingExpert && expert && (
        <ExpertsForm
          loading={loading}
          error={error}
          onSubmit={submitUpdatedExpert}
          existingExpert={existingExpert}
          isEdit
          expertName={expert.user.firstName + ' ' + expert.user.lastName}
        />
      )}
    </>
  );
};

export default EditExpert;
