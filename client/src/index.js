import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import {Toaster} from 'react-hot-toast'
import store from './redux/store';
import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Toaster position="top-center" reverseOrder={false} />
    <App />
  </Provider>
);
