import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx';
import DoctorContextProvider from './context/DoctorContext.jsx';
import AdminContextProvider from './context/AdminContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AppContextProvider>
      <DoctorContextProvider>
        <AdminContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </AdminContextProvider>
      </DoctorContextProvider>
    </AppContextProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
