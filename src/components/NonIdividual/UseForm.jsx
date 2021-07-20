/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { postNonIndividualCustomers } from '../../actions/nonIdividualCustomer';

const UseForm = validate => {
  const history = useHistory();
  const initialState = {
    bizName: '',
    tradingName: '',
    econID: '',
    indSecID: '',
    bizTypeID: '',
    regDate: '',
    activityDescription: '',
    custTypeID: '',
    riskProfileID: '',
    isDeleted: false,
    createdBy: 'BENVIK',
    createdOn: '2021-05-31T11:48:34.825Z',
    modifiedBy: 'BENVIK',
    modifiedOn: '2021-05-31T11:48:34.825Z',
  };

  const [values, setValues] = useState(initialState);

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
  };

  useEffect(async () => {
    if (Object.values(errors).includes('Creating')) {
      if (Object.keys(errors).length === 1) {
        await dispatch(postNonIndividualCustomers(values, history));
        setValues(initialState);
        setErrors({});
      }
    }
  }, [errors]);

  return {
    handleChange, values, handleSubmit, errors, setErrors,
  };
};

export default UseForm;
