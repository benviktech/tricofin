/* eslint-disable no-restricted-globals */

export default function updateCustomerValidator(values, state = 'Create Non Individual Customer') {
  const errors = {};

  if (state === 'Create Non Individual Customer') {
    errors.state = 'Creating';
  }

  if (state === 'Update Non Individual Customer') {
    errors.state = 'Updating';
  }

  if (!values.bizName) {
    errors.bizName = 'Business Name is Required';
  }
  if (!values.tradingName) {
    errors.tradingName = 'Trading Name is Required';
  }
  if (!values.econID) {
    errors.econID = 'Economic Sector is Required';
  }

  if (!values.indSecID) {
    errors.indSecID = 'Industry Sector is Required';
  }

  if (!values.bizTypeID) {
    errors.bizTypeID = 'Business Type is Required';
  }

  if (!values.regDate) {
    errors.regDate = 'Registration Date is Required';
  }

  if (new Date(values.regDate) >= new Date()) {
    errors.regDate = 'Cannot be a future Date';
  }

  if (!values.activityDescription) {
    errors.activityDescription = 'Description is Required';
  }

  if (!values.custTypeID) {
    errors.custTypeID = 'Select a Customer Type';
  }

  if (!values.riskProfileID) {
    errors.riskProfileID = 'Select a Risk Profile';
  }
  return errors;
}
