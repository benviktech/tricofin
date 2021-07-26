import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { postGroupMaintenance } from '../../actions/groupMaintenance';

const UseForm = validate => {
  const history = useHistory();
  const initialState = {
    groupName: '',
    formationDate: '',
    location: '',
    village: '',
    regDate: '',
    regNo: '',
    branchID: '',
    meetingDay: '',
    meetingFreq: '',
    meetingPlace: '',
    sourcedBy: '',
    creditOfficer: '',
    savingsProductID: '',
    loanProductID: '',
    maxMembers: null,
    minMembersLoanDisb: null,
    createdOn: (new Date()).toISOString(),
    createdBy: 'BENVIK',
    modifiedOn: (new Date()).toISOString(),
    modifiedBy: 'BENVIK',
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
        await dispatch(postGroupMaintenance(values, history));
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
