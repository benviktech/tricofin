/* eslint-disable no-nested-ternary */

export const GLListFilter = (glList, content, text) => {
  const newModalList = []; let accId = '';
  glList.forEach(account => {
    if (text === 'accountId') { accId = account.accountID; }
    if (text === 'accountName') { accId = account.accountName; }
    if (accId.length > 0) {
      if (accId.indexOf(content.toLocaleUpperCase()) !== -1) {
        newModalList.push(account);
      }
    }
  });

  return newModalList;
};

export const SCListFilter = (savingsList, sharesList, content, type, text) => {
  const newModalList = []; let accId = '';
  (type === 'savings' ? savingsList : type === 'shares' ? sharesList : null)
    .forEach(account => {
      if (text === 'accountId') { accId = account.accountID; }
      if (text === 'accountName') { accId = account.accountName; }
      if (accId.length > 0) {
        if (accId.indexOf(content.toLocaleUpperCase()) !== -1) {
          newModalList.push(account);
        }
      }
    });
  return newModalList;
};

export const calculateTotal = (cashTransactionList, type) => {
  const total = cashTransactionList
    .filter(transaction => transaction.partTranType === type
    && (transaction.tranSerialNo === 1 || !transaction.tranSerialNo))
    .reduce((sum, x) => sum + x.tranAmount, 0);
  return total;
};

export const initialState = {
  tranTypeID: '',
  accTypeID: '',
  accountId: '',
  valueDate: '',
  receiptNo: '',
  tranAmount: '',
  tranRemarks: '',
  productName: '',
  productID: '',
  tranSerialNo: '',
};
