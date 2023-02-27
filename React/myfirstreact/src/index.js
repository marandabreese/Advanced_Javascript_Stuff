import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './mysass.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Learning from './Learning';
import CarExample from './CarExample'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Learning first="First!"/>
    <CarExample />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
