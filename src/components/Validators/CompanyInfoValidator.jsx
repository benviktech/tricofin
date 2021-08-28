/* eslint-disable no-restricted-globals */

export default function updateCompanyInfoValidator(values) {
  const errors = {};

  if (!values.pAddress.trim()) {
    errors.pAddress = 'Physical Address Required';
  }

  if (!values.boxAddress.trim()) {
    errors.boxAddress = 'P.o Box Address Required';
  }

  if (!values.email.trim()) {
    errors.email = 'Company Email Address Required ';
  }

  if (!values.phone) {
    errors.phone = 'Company Phone Number is Required';
  }
  return errors;
}
