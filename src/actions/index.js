import { FetchStaticData } from '../utils/api';

export const FETCH_STATIC_DATA = 'FETCH_STATIC_DATA';
export const LOADING_CONTENT = 'LOADING_CONTENT';
export const LOADING_ERROR = 'LOADING_ERROR';

export const fetchUiStaticData = () => async dispatch => {
  const method = 'get';
  const path = '/api/StaticData/GetStaticData';
  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await FetchStaticData(method, path);
    dispatch({ type: FETCH_STATIC_DATA, payload: response.data });
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};
