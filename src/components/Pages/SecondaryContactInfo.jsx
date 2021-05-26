import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ContactInfo from './ContactInfo';
import contactValidator from '../Validators/ContactValidator';
import { postCustomerContact } from '../../actions/pages';

const SecondaryContactInfo = () => {
  const headerSecondaryContact = 'Secondary Contact Information';
  const [errors, setErrors] = useState({ logError: 'log error' });
  const dispatch = useDispatch();
  const [modal, setModal] = useState('d-none');
  const postError = useSelector(state => state.individualCustomerIdentification.error);
  const { id } = useParams();
  const postSuccess = useSelector(state => state.individualCustomerIdentification.contact);
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

  useEffect(async () => {
    if (Object.keys(errors).includes('buttonClick')) {
      if (Object.keys(errors).length === 1) {
        await dispatch(postCustomerContact(values));
        setModal('');
        setErrors({});
        setValues(initialState);
      }
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
      postError={postError}
      modal={modal}
      setModal={setModal}
      postSuccess={postSuccess}
    />
  );
};

export default SecondaryContactInfo;
