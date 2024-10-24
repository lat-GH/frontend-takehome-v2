import {
  FunctionComponent,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react';
import { applicationReducer } from '../../reducers/application';
import { ApplicationState } from '../../reducers/application/types';
import { updateActiveDepartment } from '../../reducers/application/actions';

// creating a type that matches the activeDepartment, departments, subDepartments format!
// also connecting it to the fucntion that allows you to update the active department
type ApplicationContextType = ApplicationState & {
  updateActiveDepartment: (value: string) => void;
};

//setting a defaul state value for application
const defaultState = {
  activeDepartment: '',
  departments: {
    data: [],
    loading: false,
    error: false,
  },
  subDepartments: {
    data: [],
    loading: false,
    error: true, //INTERSTIN the error starts off as true!! so not nessicelry being triggered by an error
  },
};

// context stores BOTH the state values/data AND  the methods that apply to the reducer for the UPDATE_ACTIVE_DEPARTMENT
const defaultContext = {
  ...defaultState,
  updateActiveDepartment: () => {},
};

// this is where the context gets CREATED! (uses all the stuff that was set up above)
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
  const [state, dispatch] = useReducer(applicationReducer, defaultState);

  return (
    // the provider is the root for the context and allows it to be populated elsewhere with the use of a consumer
    <ApplicationContext.Provider
      value={{
        //holds the state values e.g. departments and subdepartments
        ...state,
        //holds the fucntion ot update the reducer
        updateActiveDepartment: updateActiveDepartment(dispatch),
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
