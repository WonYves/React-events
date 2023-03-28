import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './reast.css'
import './index.css'
import { Provider } from 'react-redux';
import { store, persistor } from './store';  // 持久化8
import { PersistGate } from 'redux-persist/integration/react'   // 持久化9

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
)