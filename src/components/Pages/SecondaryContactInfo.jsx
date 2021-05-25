import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import ContactInfo from './ContactInfo';
import contactValidator from '../Validators/ContactValidator';
import { postCustomerContact } from '../../actions/pages';

const SecondaryContactInfo = () => {
  const headerSecondaryContact = 'Secondary Contact Information';
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const [values, setValues] = useState(
    {
      custID: id,
      contactType: 'S',
      buildingName: '',
      floorNo: '',
      plotStreetNo: '',
      lcStreetName: '',
      parish: '',
      suburb: '',
      village: '',
      countyTown: '',
      district: '',
      region: '',
      poBoxNo: '',
      postOfficeTown: '',
      countryCode: '',
      atAddressSince: '',
      pnTelNo: '',
      mobNo: '',
      emailAddress: '',
      website: '',
      createdBy: 'BENVIK',
      createdOn: '2021-05-25T11:48:42.653Z',
      modifiedBy: 'BENVIK',
      modifiedOn: '2021-05-25T11:48:42.653Z',
    },
  );

  const clearErrors = () => setErrors({});

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const submitSecondaryContact = e => {
    e.preventDefault();
    setErrors(contactValidator(values));
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      dispatch(postCustomerContact(values));
    }
  }, [errors]);

  return (
    <ContactInfo
      header={headerSecondaryContact}
      submitForm={submitSecondaryContact}
      handleChange={handleChange}
      values={values}
      errors={errors}
      clearErrors={clearErrors}
    />
  );
};

export default SecondaryContactInfo;
