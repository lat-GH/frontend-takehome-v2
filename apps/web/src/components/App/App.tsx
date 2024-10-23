import Header from '../Header';
import { Application } from '../../contexts/ApplicationContext';
import Page from '../Page';

const App = () => {
  return (
    <Application>
      <Header />
      <Page />
    </Application>
  );
};

export default App;
