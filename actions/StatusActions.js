import { SET_LOADING } from 'config/actionTypes';

export const setLoading = loading => {
  return {
    type: SET_LOADING,
    loading
  };
};
