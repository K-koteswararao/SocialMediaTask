import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Importing basic styles (optional)
import App from './App';

// Create a root reference for rendering the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
