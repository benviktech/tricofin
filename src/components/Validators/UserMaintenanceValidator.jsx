/* eslint-disable no-restricted-globals */

export default function userMaintenanceValidator(values) {
  //   console.log(values);
  const errors = {};

  if (!values.roleID) {
    errors.roleID = 'Role ID cannot be Empty';
  }

  if (!values.userName) {
    errors.userName = 'UserName is Required';
  }

  if (!values.surName) {
    errors.surName = 'SurName is Required';
  }

  if (!values.otherNames) {
    errors.otherNames = 'OtherNames is Required';
  }

  if (!values.userPassword) {
    errors.userPassword = 'UserPassword is Required ';
  } else if (values.userPassword !== values.password) {
    errors.userPassword = 'Passwords Donot Match ';
  }

  if (!values.phoneNo1) {
    errors.phoneNo1 = 'Phone Number 1 is required';
  }
  return errors;
}
