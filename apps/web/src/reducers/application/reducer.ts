import { ActionTypes, Actions, ApplicationState } from './types';

const applicationReducer = (state: ApplicationState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.UPDATE_ACTIVE_DEPARTMENT: {
      state.activeDepartment = action.payload.value;
      return state;
    }
    default: {
      return state;
    }
  }
};

export default applicationReducer;
