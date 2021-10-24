export default function transactionValidator(values) {
  const errors = {};

  if (!values.partTranType) {
    errors.partTranType = 'PartTranType is required';
  }
  if (!values.accountType) {
    errors.accountType = 'AccountType be number';
  }
  if (!values.accountID) {
    errors.accountID = 'Account is required';
  }
  if (!values.receiptNo) {
    errors.receiptNo = 'Receipt is required';
  }
  if (!values.valueDate) {
    errors.valueDate = 'Date is required';
  }
  if (!values.tranRemarks) {
    errors.tranRemarks = 'TranRemarks is required';
  }
  if (!values.tranAmount) {
    errors.tranAmount = 'tranAmount is required';
  }
  return errors;
}

/*
      valueDate: result.valueDate,
      branchID: currentAccount.branchID,
      accountID: result.accountId,
      accountType: result.accTypeID,
      productID: result.productID,
      partTranType: result.partTranType,
      receiptNo: (result.receiptNo).toUpperCase(),
      tranAmount: parseInt(result.tranAmount, 10),
      tranCode: result.tranTypeID,
      tranParticulars: 'CASH DEPOSIT',
      tranRemarks: (result.tranRemarks).toUpperCase(),
  */
