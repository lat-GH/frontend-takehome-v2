import { Dispatch } from 'react';
import { ActionTypes, Actions } from './types';

export const updateActiveDepartment =
  (dispatch: Dispatch<Actions>) => (value: string) =>
    dispatch({
      type: ActionTypes.UPDATE_ACTIVE_DEPARTMENT,
      payload: {
        value,
      },
    });
