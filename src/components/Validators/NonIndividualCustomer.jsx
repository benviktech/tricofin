/* eslint-disable no-restricted-globals */

export default function updateCustomerValidator(values, state = 'Create Non Individual Customer') {
  const errors = {};
  const todaysDate = new Date();

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

  if (new Date(values.regDate) <= todaysDate) {
    errors.regDate = 'Must be future Date';
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

/*
      bizName: 'Softearth',
    tradingName: 'Sample Trade',
    econID: 0,
    indSecID: 0,
    bizTypeID: 0,
    regDate: '2021-05-31T11:48:34.825Z',
    activityDescription: 'Great Business',
    custTypeID: 'C',
    riskProfileID: 'H',
    isDeleted: false,
    createdBy: 'BENVIK',
    createdOn: '2021-05-31T11:48:34.825Z',
    modifiedBy: 'BENVIK',
    modifiedOn: '2021-05-31T11:48:34.825Z',
  */
