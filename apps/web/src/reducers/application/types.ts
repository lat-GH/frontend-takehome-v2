//this is what is taken out at the list items
export type RequestState<T extends unknown> = {
  // this is what is cuaseing my unknonw error in page.tsx?
  data: Array<T>;
  loading: boolean;
  error: boolean;
};

//this is what application is made from!
export type ApplicationState = {
  activeDepartment: string | null;
  departments: RequestState;
  subDepartments: RequestState;
};

//this is used to update the active deparment
export enum ActionTypes {
  UPDATE_ACTIVE_DEPARTMENT = 'UPDATE_ACTIVE_DEPARTMENT',
}

// defines the actions used in the reducer
export type Actions = {
  type: ActionTypes.UPDATE_ACTIVE_DEPARTMENT;
  payload: {
    value: string;
  };
};
