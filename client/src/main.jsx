import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './App';
import './styles/index.css';
import ReduxStore from './redux/ReduxStore';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={ReduxStore}>
      <App />
    </Provider>
  </BrowserRouter>,
)
