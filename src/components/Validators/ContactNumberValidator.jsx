/* eslint-disable no-restricted-globals */
export default function numbersValidator(contactNumbers) {
  const results = {};
  if (contactNumbers.plotStreetNo && isNaN(contactNumbers.plotStreetNo)) {
    results.plotStreetNo = 'Must be number';
  }
  if (contactNumbers.floorNo && isNaN(contactNumbers.floorNo)) {
    results.floorNo = 'Must be number';
  }
  if (contactNumbers.poBoxNo && isNaN(contactNumbers.poBoxNo)) {
    results.poBoxNo = 'Must be number';
  }
  if (contactNumbers.pnTelNo && isNaN(contactNumbers.pnTelNo)) {
    results.pnTelNo = 'Must be number';
  }
  if (contactNumbers.mobNo && isNaN(contactNumbers.mobNo)) {
    results.mobNo = 'Must be number';
  }

  return results;
}
