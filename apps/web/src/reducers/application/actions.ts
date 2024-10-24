import { Dispatch } from 'react';
import { ActionTypes, Actions } from './types';

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
