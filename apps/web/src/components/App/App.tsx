import Header from '../Header';
import { Application } from '../../contexts/ApplicationContext';
import Page from '../Page';

const App = () => {
  return (
    //the Application combines both the Reducers and the Context used through the webapp
    <Application>
      <Header />
      <Page />
    </Application>
  );
};

export default App;
