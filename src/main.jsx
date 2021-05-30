import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import App from './App';
import './index.css';

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline/>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
