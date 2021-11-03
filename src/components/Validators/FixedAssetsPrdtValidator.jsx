/* eslint-disable no-restricted-globals */

export default function fixedAssetsPrdtValidator(values, state) {
  const errors = {};
  errors.state = state;
  if (!values.productID) {
    errors.productID = 'Product ID is provided';
  }
  if (!values.productName) {
    errors.productName = 'Product Name is required';
  }
  if (!values.controlAccountGL) {
    errors.controlAccountGL = 'Control AccountGL is required';
  }
  if (!values.accumDepGL) {
    errors.accumDepGL = 'Accum DepGL is required';
  }
  if (!values.depExpenseGL) {
    errors.depExpenseGL = 'DepExpenseGL is required';
  }
  if (!values.saleoffLossGL) {
    errors.saleoffLossGL = 'SaleoffLossGL is required';
  }
  if (!values.saleoffProfitGL) {
    errors.saleoffProfitGL = 'SaleoffProfitGL is required';
  }
  if (!values.setID) {
    errors.setID = 'setID is required';
  }
  return errors;
}
