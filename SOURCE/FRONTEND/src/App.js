import React from 'react';
import './App.css';
import store from "./redux/store";
import { Provider } from "react-redux";
import AppNavigator from './navigation/AppNavigator';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BackTop, notification } from 'antd';
import NotifyContext from "@context/NotifyContext"

const notify = (type, message, des) => {
  notification[type]({
    message: message,
    description: des,
    duration: 2
  });
}

function App() {
  return (
    <>
      <Provider store={store}>
        <NotifyContext.Provider value={notify}>
          <AppNavigator />
        </NotifyContext.Provider>
      </Provider>
      <BackTop style={{ zIndex: "9999" }} />
    </>
  );
}

export default App;
