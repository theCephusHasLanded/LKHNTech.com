import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// Make sure we're importing any global styles
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);