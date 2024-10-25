import { Dispatch } from 'react';
import { ActionTypes, Actions, RequestState } from './types';

// brings together the types to make a fucntion
export const updateActiveDepartment =
  // allows you to make the UPDATE_ACTIVE_DEPARTMENT action
  (dispatch: Dispatch<Actions>) => (value: string) =>
    dispatch({
      type: ActionTypes.UPDATE_ACTIVE_DEPARTMENT,
      payload: {
        value,
      },
    });

// action ot update the Departments
export const updateDepartment =
  (dispatch: Dispatch<Actions>) => (value: RequestState<any>) =>
    dispatch({
      type: ActionTypes.UPDATE_DEPARTMENTS,
      payload: {
        value,
      },
    });

// action ot update the subDepartments
export const updateSubDepartment =
  (dispatch: Dispatch<Actions>) => (value: RequestState<any>) =>
    dispatch({
      type: ActionTypes.UPDATE_SUB_DEPARTMENTS,
      payload: {
        value,
      },
    });
