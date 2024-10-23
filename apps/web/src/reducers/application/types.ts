export type RequestState<T extends unknown> = {
  data: Array<T>;
  loading: boolean;
  error: boolean;
};

export type ApplicationState = {
  activeDepartment: string | null;
  departments: RequestState;
  subDepartments: RequestState;
};

export enum ActionTypes {
  UPDATE_ACTIVE_DEPARTMENT = 'UPDATE_ACTIVE_DEPARTMENT',
}

export type Actions = {
  type: ActionTypes.UPDATE_ACTIVE_DEPARTMENT;
  payload: {
    value: string;
  };
};
