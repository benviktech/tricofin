import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { postIndividualCustomers } from '../../actions/individualCustomer';

const UseForm = validate => {
  const history = useHistory();
  const [values, setValues] = useState({
    surName: '',
    foreName1: '',
    foreName2: null,
    foreName3: null,
    rAddress: '',
    emailID1: null,
    emailID2: null,
    phone1: null,
    phone2: null,
    phone3: null,
    dateofbirth: '',
    genderID: '',
    nationalityID: '',
    maritalStatusID: '',
    riskProfileID: '',
    custTypeID: '',
    title: '',
  });

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

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      dispatch(postIndividualCustomers(values, history));
    }
  }, [errors]);

  return {
    handleChange, values, handleSubmit, errors,
  };
};

export default UseForm;
