import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
