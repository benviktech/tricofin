/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router';
import ContactInfo from './NonIndividualContact';
import { postCustomerContact, updateCustomerContact } from '../../actions/pages';
import contactValidator from '../Validators/ContactValidator';

const SecondaryContactInfo = () => {
  const headerSecondaryContact = 'Secondary Contact Information';
  const [errors, setErrors] = useState({ logError: 'log error' });
  const dispatch = useDispatch();
  const [modal, setModal] = useState('d-none');
  const postError = useSelector(state => state.individualCustomerIdentification.error);
  const { id } = useParams();
  const postSuccess = useSelector(state => state.individualCustomerIdentification.contact);
  const [contactInfo, setContactInfo] = useState({});
  const initialState = {
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
  };
  const [values, setValues] = useState(initialState);

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

  const updateSecondaryContact = () => {
    const state = 'Update Contact';
    setErrors(contactValidator(contactInfo, state));
  };

  useEffect(async () => {
    if (Object.values(errors).includes('Save Contact')) {
      if (Object.keys(errors).length === 1) {
        await dispatch(postCustomerContact(values));
        setModal('');
        setErrors({});
        setValues(initialState);
      }
    }

    if (Object.values(errors).includes('Update Contact')) {
      if (Object.keys(errors).length === 1) {
        await dispatch(updateCustomerContact(contactInfo));
        setModal('');
        setErrors({});
        setValues(initialState);
      }
    }
  }, [errors]);

  useEffect(async () => {
    const response = await axios.get(`https://tricofin.azurewebsites.net/api/Customers/GetSecondaryContactInformation/${id}`);
    if (response.data) {
      if (Object.keys(response.data).includes('contactType')) {
        setContactInfo(response.data);
        setModal('');
      }
    }
    return () => {
      setModal('d-none');
    };
  }, []);

  return (
    <ContactInfo
      header={headerSecondaryContact}
      submitForm={submitSecondaryContact}
      handleChange={handleChange}
      values={values}
      errors={errors}
      clearErrors={clearErrors}
      postError={postError}
      modal={modal}
      setModal={setModal}
      postSuccess={postSuccess}
      contactInfo={contactInfo}
      updateContact={updateSecondaryContact}
      setContactInfo={setContactInfo}
    />
  );
};

export default SecondaryContactInfo;
