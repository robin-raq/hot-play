import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from './constants';
//console.log(data)
ReactDOM.render(
    
    <BrowserRouter>
        <ActionCableProvider 
        url={API_WS_ROOT}>
            <App />
        </ActionCableProvider>
        </BrowserRouter>
    , document.getElementById('root'))
