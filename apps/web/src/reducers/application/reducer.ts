import { ActionTypes, Actions, ApplicationState } from './types';

const applicationReducer = (state: ApplicationState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.UPDATE_ACTIVE_DEPARTMENT: {
      state.activeDepartment = action.payload.value;
      //console.log(`UPDATE_ACTIVE_DEPARTMEN ${state.activeDepartment}`);
      return state;
    }
    default: {
      //throw new Error(`No case for type ${action.type}found in reducer`);
      return state;
    }
  }
};

export default applicationReducer;
