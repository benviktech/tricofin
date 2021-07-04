/* eslint-disable no-restricted-globals */

export default function GroupMaintenanceValidator(values, state = 'Create Group Maintenance') {
  const errors = {};

  if (state === 'Create Group Maintenance') {
    errors.state = 'Creating';
  }

  if (state === 'Update Group Maintenance') {
    errors.state = 'Updating';
  }

  if (!values.groupName) {
    errors.groupName = 'Group Name is Required';
  }
  if (!values.formationDate) {
    errors.formationDate = 'Date is Required';
  }
  if (!values.location) {
    errors.location = 'Location is Required';
  }

  if (!values.branchID) {
    errors.branchID = 'Branch Required';
  }

  if (!values.village) {
    errors.village = 'Village is Required';
  }

  if (!values.regDate) {
    errors.regDate = 'Date is Required';
  }

  if (!values.regNo) {
    errors.regNo = 'Reg Number is Required';
  }

  if (!values.meetingDay) {
    errors.meetingDay = 'Meeting Day is Required';
  }

  if (!values.meetingFreq) {
    errors.meetingFreq = 'Meeting Freq is Required';
  }

  if (!values.meetingPlace) {
    errors.meetingPlace = 'Meeting Place is Required';
  }

  if (!values.creditOfficer) {
    errors.creditOfficer = 'Credit Officer is Required';
  }

  if (!values.savingsProductID) {
    errors.savingsProductID = 'Savings Product ID is Required';
  }

  if (!values.loanProductID) {
    errors.loanProductID = 'Loan Product ID is Required';
  }

  if (!values.maxMembers && state === 'Create Group Maintenance') {
    errors.maxMembers = 'Required';
  }
  if (values.maxMembers && isNaN(values.maxMembers)) {
    errors.maxMembers = 'Must be number';
  }

  if (!values.minMembersLoanDisb && state === 'Create Group Maintenance') {
    errors.minMembersLoanDisb = 'Required';
  }
  if (values.minMembersLoanDisb && isNaN(values.minMembersLoanDisb)) {
    errors.minMembersLoanDisb = 'Must be number';
  }

  return errors;
}
