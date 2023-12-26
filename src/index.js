import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './Store/UserStore';
import EventStore from './Store/EventStore';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const Context = createContext(null);

root.render(
  <React.StrictMode>
    <Context.Provider value={{
      user: new UserStore(),
      event: new EventStore()
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);