/* eslint-disable no-restricted-globals */

export default function contactValidator(values) {
  const errors = {};
  errors.buttonClick = 'submission';
  if (!values.atAddressSince) {
    errors.atAddressSince = 'Must be provided';
  }
  if (values.plotStreetNo && isNaN(values.plotStreetNo)) {
    errors.plotStreetNo = 'Must be number';
  }
  if (values.floorNo && isNaN(values.floorNo)) {
    errors.floorNo = 'Must be number';
  }
  if (values.poBoxNo && isNaN(values.poBoxNo)) {
    errors.poBoxNo = 'Must be number';
  }
  if (values.pnTelNo && isNaN(values.pnTelNo)) {
    errors.pnTelNo = 'Must be number';
  }
  if (values.mobNo && isNaN(values.mobNo)) {
    errors.mobNo = 'Must be number';
  }
  return errors;
}
