//why is it called request state?
export type RequestState<T extends unknown> = {
  data: Array<T>;
  loading: boolean;
  error: boolean;
};

export type ApplicationState = {
  activeDepartment: string | null;
  departments: RequestState<any>;
  subDepartments: RequestState<any>;
};

//this is used to update the active deparment
export enum ActionTypes {
  UPDATE_ACTIVE_DEPARTMENT = 'UPDATE_ACTIVE_DEPARTMENT',
  UPDATE_DEPARTMENTS = 'UPDATE_DEPARTMENTS', // new action for departments
  UPDATE_SUB_DEPARTMENTS = 'UPDATE_SUB_DEPARTMENTS', // new action for subDepartments
}

// defines the type of the actions used in the reducer
//depending on which action is needed then it will use a different type
export type Actions =
  | {
      type: ActionTypes.UPDATE_ACTIVE_DEPARTMENT;
      payload: {
        value: string;
      };
    }
  | {
      type: ActionTypes.UPDATE_DEPARTMENTS;
      payload: {
        value: RequestState<any>;
      };
    }
  | {
      type: ActionTypes.UPDATE_SUB_DEPARTMENTS;
      payload: {
        value: RequestState<any>;
      };
    };
