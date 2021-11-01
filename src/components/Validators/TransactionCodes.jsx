export default function transactionCodesValidator(values) {
  const errors = {};

  if (!values.tranCode) {
    errors.tranCode = 'tranCode is required';
  }
  if (!values.partTranType) {
    errors.partTranType = 'partTranType be number';
  }
  if (!values.tranCat) {
    errors.tranCat = 'tranCat is required';
  }
  if (!values.tranType) {
    errors.tranType = 'tranType is required';
  }
  if (!values.attachTo) {
    errors.attachTo = 'attachTo is required';
  }
  if (!values.chargeType) {
    errors.chargeType = 'chargeType is required';
  }
  return errors;
}
