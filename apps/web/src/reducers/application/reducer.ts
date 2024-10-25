import { ActionTypes, Actions, ApplicationState } from './types';
//reducers store all of the state update logic
// this is where the values actually get updated based on the input actions and values
const applicationReducer = (state: ApplicationState, action: Actions) => {
  // switch cased based on different possible actions you can call on the reducer
  switch (action.type) {
    //This will allow the active deprament value be set to whatever value is passed in
    case ActionTypes.UPDATE_ACTIVE_DEPARTMENT: {
      //console.log(`UPDATE_ACTIVE_DEPARTMEN ${state.activeDepartment}`);
      return {
        ...state, // spread the previous state to avoid mutating
        activeDepartment: action.payload.value, // update the activeDepartment
      };
    }
    case ActionTypes.UPDATE_DEPARTMENTS: {
      return {
        ...state,
        departments: {
          // this structure matches the RequestState
          data: action.payload.value.data,
          loading: action.payload.value.loading,
          error: action.payload.value.error,
        },
      };
    }
    case ActionTypes.UPDATE_SUB_DEPARTMENTS: {
      return {
        ...state,
        subDepartments: {
          data: action.payload.value.data,
          loading: action.payload.value.loading,
          error: action.payload.value.error,
        },
      };
    }
    default: {
      throw new Error(`No case for type ${action.type}found in reducer`);
      //return state;
    }
  }
};

export default applicationReducer;
