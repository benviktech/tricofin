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

const conditionCheck = (account, cursorPosition, text) => {
  const value = (
    (cursorPosition === 'Set ID' || cursorPosition === 'branch id')
      ? (text === 'currentID' ? account.setID : text === 'currentName' ? account.setName : null)
      : cursorPosition === 'product id'
        ? (text === 'currentID' ? account.productID : text === 'currentName' ? account.productName : null)
        : (cursorPosition === 'control gl' || cursorPosition === 'Accum Drep'
            || cursorPosition === 'Dep Expense' || cursorPosition === 'Saleoff Loss'
            || cursorPosition === 'Saleoff Profit')
          ? (text === 'currentID' ? account.glid : text === 'currentName' ? account.glName : null)
          : (text === 'currentID' ? account.tranCode : text === 'currentName' ? account.narration : null)
  );
  return value;
};

export const AssestsPrdFilter = (list, value, cursorPosition, text) => {
  const newModalList = []; let accId = '';
  list.forEach(account => {
    accId = conditionCheck(account, cursorPosition, text);
    if (accId.length > 0) {
      if (accId.indexOf(value.toLocaleUpperCase()) !== -1) {
        newModalList.push(account);
      }
    }
  });
  return newModalList;
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
