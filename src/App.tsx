import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContextProvider } from './contexts/UserContext';
import { withAxiosInterceptor } from './interceptor/AxiosInterceptor';

function App() {
  const content = useRoutes(router);

  return (
    <UserContextProvider>
      <ThemeProvider>
        <ToastContainer />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          {content}
        </LocalizationProvider>
      </ThemeProvider>
    </UserContextProvider>
  );
}
export default withAxiosInterceptor(App);
