import {
  FunctionComponent,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react';
import { applicationReducer } from '../../reducers/application';
import {
  ApplicationState,
  Actions,
  RequestState,
} from '../../reducers/application/types';
import {
  updateActiveDepartment,
  updateDepartment,
  updateSubDepartment,
} from '../../reducers/application/actions';

// Define the type for the context
type ApplicationContextType = ApplicationState & {
  updateActiveDepartment: (value: string) => void;
  updateDepartment: (value: RequestState<any>) => void; // New function to update departments
  updateSubDepartment: (value: RequestState<any>) => void;
};

//setting a defaul state value for application
const defaultState: ApplicationState = {
  activeDepartment: '',
  departments: {
    data: [],
    loading: false,
    error: false,
  },
  subDepartments: {
    data: [],
    loading: false,
    error: true, //INTERSTING the error starts off as true!! so not nessicelry being triggered by an error
  },
};

// context stores BOTH the state values/data AND  the methods that apply to the reducer for the UPDATE_ACTIVE_DEPARTMENT
const defaultContext = {
  ...defaultState,
  updateActiveDepartment: () => {},
  updateDepartment: () => {}, // Placeholder function for updateDepartments
  updateSubDepartment: () => {},
};

// this is where the context gets CREATED!
//
const ApplicationContext =
  createContext<ApplicationContextType>(defaultContext);

// HUNCH this is a render props?
// this Application component is wrapped around the whole of the web app in App.tsx

export const Application: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  // function starts here
  //sets up the reducer inside of the Application component
  //and sets the default state of the reducer to match that of the context
  const [state, dispatch] = useReducer<
    React.Reducer<ApplicationState, Actions>
  >(applicationReducer, defaultState); //defaultState is of type ApplicationState

  return (
    // the provider is the root for the context and allows it to be populated elsewhere with the use of a consumer
    <ApplicationContext.Provider
      value={{
        //holds the state values e.g. departments and subdepartments
        ...state,
        //holds the fucntion ot update the reducer
        updateActiveDepartment: updateActiveDepartment(dispatch),
        updateDepartment: updateDepartment(dispatch), // Add updateDepartments function
        updateSubDepartment: updateSubDepartment(dispatch),
      }}>
      {children}
    </ApplicationContext.Provider>
  );
};

//this gives us access to the context! BUT not the reducer and those fucntionalities
// ASSUMPITON might be able to access the reducer directly inside of the the Page.tsx
export const useApplication = () => {
  const application = useContext(ApplicationContext);
  return application;
};
