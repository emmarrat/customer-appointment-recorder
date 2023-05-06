import React from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import {createExpert} from "./expertsThunks";
import {ExpertMutation} from "../../types";
import ExpertsForm from "./components/ExpertsForm";
import {selectExpertCreating, selectExpertCreatingError} from "./expertsSlice";

const NewExpert = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
const error = useAppSelector(selectExpertCreatingError);
const loading = useAppSelector(selectExpertCreating)

  const submitNewExpert = async (expert: ExpertMutation) => {
    await dispatch(createExpert(expert)).unwrap();
    navigate('/admin/experts');
  };

  return (
    <div>
      <ExpertsForm loading={loading} error={error} onSubmit={submitNewExpert}/>
    </div>
  );
};

export default NewExpert;