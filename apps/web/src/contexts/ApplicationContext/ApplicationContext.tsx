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

type ApplicationContextType = ApplicationState & {
  updateActiveDepartment: (value: string) => void;
};

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
    error: true,
  },
};

const defaultContext = {
  ...defaultState,
  updateActiveDepartment: () => {},
};

const ApplicationContext =
  createContext<ApplicationContextType>(defaultContext);

export const Application: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(applicationReducer, defaultState);

  return (
    <ApplicationContext.Provider
      value={{
        ...state,
        updateActiveDepartment: updateActiveDepartment(dispatch),
      }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => {
  const application = useContext(ApplicationContext);
  return application;
};
