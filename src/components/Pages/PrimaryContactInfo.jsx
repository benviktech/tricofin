/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-globals */

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import ContactInfo from './ContactInfo';
import { postCustomerContact } from '../../actions/pages';
import contactValidator from '../Validators/ContactValidator';

const PrimaryContactForm = () => {
  const headerPrimaryContact = 'Primary Contact Information';
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const [values, setValues] = useState(
    {
      custID: id,
      contactType: 'P',
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

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const submitPrimaryContact = e => {
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
      header={headerPrimaryContact}
      submitForm={submitPrimaryContact}
      handleChange={handleChange}
      values={values}
    />
  );
};

export default PrimaryContactForm;
