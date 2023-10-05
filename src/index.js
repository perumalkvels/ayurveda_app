import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './Redux/Store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <div id='scroll' style={{overflowY:'scroll',height:'100vh'}}>
  <Provider store={store}>
    <App />
  </Provider>
  </div>
);

