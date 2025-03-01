import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import axios from 'axios';

// Set axios defaults based on environment
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);