/* eslint-disable no-restricted-globals */

export default function accessRightsValidator(values) {
  console.log(values);
  const errors = {};

  if (!values.roleID.trim()) {
    errors.roleID = 'Choose a Role to set its Rights';
  }

  // if (!values.columnID) {
  //   errors.columnID = "Please Select a Module to proceed";
  // }

  //   if (!values.email.trim()) {
  //     errors.email = "Company Email Address Required ";
  //   }

  //   if (!values.phone) {
  //     errors.phone = "Company Phone Number is Required";
  //   }
  return errors;
}
