/* eslint-disable no-restricted-globals */

export default function MaintainFixedAssetValidator(values, state) {
  const errors = {};
  errors.state = state;
  if (!values.supplierID) {
    errors.supplierID = 'Supplier ID is Required';
  }
  if (!values.serialNo) {
    errors.serialNo = 'Serial Number is Required';
  }
  if (!values.tagNo) {
    errors.tagNo = 'Tag Number is Required';
  }

  if (!values.brandName) {
    errors.brandName = 'Brand Name is Required';
  }

  if (!values.location) {
    errors.location = 'Location is Required';
  }

  if (!values.depMthd) {
    errors.depMthd = 'DepMthd is Required';
  }

  if (!values.depFrom) {
    errors.depFrom = 'DepFrom is Required';
  }

  if (!values.purchasedOn) {
    errors.purchasedOn = 'PurchasedOn is Required';
  }

  if (!values.branchID) {
    errors.branchID = 'BranchID is Required';
  }

  return errors;
}
