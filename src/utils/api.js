import axios from 'axios';

const baseUrl = 'https://tricofin.azurewebsites.net';

export const FetchIndividualCustomersRequest = async (method, path) => {
  const response = await axios[method](`${baseUrl}/${path}`);
  return response;
};

export const PostIndividualCustomersRequest = async (method, data, path) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const GetIndividualCustomersRequest = async (method, path) => {
  const response = await axios[method](`${baseUrl}/${path}`);
  return response;
};

export const UpdateIndividualCustomersRequest = async (method, data, path) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const DeleteIndividualCustomersRequest = async (method, path) => {
  const response = await axios[method](`${baseUrl}/${path}`);
  return response;
};

export const FetchStaticData = async (method, path) => {
  const response = await axios[method](`${baseUrl}/${path}`);
  return response;
};

export const SignaturePhotoAdditionRequest = async (method, path, data) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const PhotoSignatureRequest = async (method, path) => {
  const response = await axios[method](`${baseUrl}/${path}`);
  return response;
};

export const PostIdentificationSuccessRequest = async (method, path, data) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const GetIdentificationSuccessRequest = async (method, path) => {
  const response = await axios[method](`${baseUrl}/${path}`);
  return response;
};

export const PostContactSuccessRequest = async (method, path, data) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const UpdateContactSuccessRequest = async (method, path, data) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const FetchCountriesDataRequest = async (method, path) => {
  const response = await axios[method](`${baseUrl}/${path}`);
  return response;
};

export const DeleteIdentificationSuccessRequest = async (method, path) => {
  const response = await axios[method](`${baseUrl}/${path}`);
  return response;
};

export const PostNonIndividualCustomersRequest = async (method, data, path) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const GetNonIndividualCustomerRequest = async (method, path) => {
  const response = await axios[method](`${baseUrl}/${path}`);
  return response;
};

export const UpdateNonIndividualCustomersRequest = async (method, data, path) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const SaveCustomerDirector = async (method, path, data) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const GetCustomerDirector = async (method, path) => {
  const response = await axios[method](`${baseUrl}/${path}`);
  return response;
};

export const DeleteCustomerDirector = async (method, path) => {
  const response = await axios[method](`${baseUrl}/${path}`);
  return response;
};

export const PostGroupMaintenanceRequest = async (method, path, data) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const GetGroupMaintenanceRequest = async (method, path) => {
  const response = await axios[method](`${baseUrl}/${path}`);
  return response;
};

export const UpdateGroupMaintenanceRequest = async (method, data, path) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const PostGroupMemberRequest = async (method, data, path) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const FetchGroupMembersListRequest = async (method, path) => {
  const response = await axios[method](`${baseUrl}/${path}`);
  return response;
};

export const DeleteGroupMemberRequest = async (method, values, path) => {
  const response = await axios[method](`${baseUrl}/${path}`, { data: values });
  return response;
};
export const FetchCompanyInfoRequest = async (method, path) => {
  const response = await axios[method](`${baseUrl}/${path}`);
  return response;
};

export const UpdateCompanyInfoRequest = async (method, result, path) => {
  const response = await axios[method](`${baseUrl}/${path}`, result);
  return response;
};

export const FetchSystemModuleRequest = async (method, path) => {
  const response = await axios[method](`${baseUrl}/${path}`);
  return response;
};

export const GetGeneralLedgerSubTypes = async (method, path) => {
  const response = await axios[method](`${baseUrl}/${path}`);
  return response;
};

export const FetchSystemRoleRequest = async (method, path) => {
  const response = await axios[method](`${baseUrl}/${path}`);
  return response;
};

export const PostSystemsRoleRequest = async (method, path, data) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const UpdateSystemsRoleRequest = async (method, path, data) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const PostGeneralLedgerSubTypes = async (method, path, data) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const DeleteSystemsRoleRequest = async (method, path, data) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const PostSystemUserRequest = async (method, path, data) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const UpdateSystemUserRequest = async (method, path, data) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const DeleteSystemUserRequest = async (method, path) => {
  const response = await axios[method](`${baseUrl}/${path}`);
  return response;
};
export const UpdateGeneralLedgerSubType = async (method, path, data) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const SaveGeneralLedgerID = async (method, path, data) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const GetGeneralLedgerID = async (method, path) => {
  const response = await axios[method](`${baseUrl}/${path}`);
  return response;
};

export const UpdateGeneralLedgerID = async (method, path, data) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const SaveGeneralLedger = async (method, path, data) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const GetGeneralLedgerRequest = async (method, path) => {
  const response = await axios[method](`${baseUrl}/${path}`);
  return response;
};

export const UpdateGeneralLedgerRequest = async (method, path, data) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const VerifyGeneralLedgers = async (method, path, data) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const CopySingleGltoAccounts = async (method, path, data) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const CopyMultipleGlsToBranch = async (method, path, data) => {
  const response = await axios[method](`${baseUrl}/${path}`, data);
  return response;
};

export const CloseGLAccountRequest = async (method, path) => {
  const response = await axios[method](`${baseUrl}/${path}`);
  return response;
};
