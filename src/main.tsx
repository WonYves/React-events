import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './reast.css'
import './index.css'
import { Provider } from 'react-redux';
import store from './store/redux';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <App />
    </Provider>
)
