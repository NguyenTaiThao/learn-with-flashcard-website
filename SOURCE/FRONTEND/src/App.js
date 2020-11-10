import React from 'react';
import './App.css';
import store from "./redux/store";
import { Provider } from "react-redux";
import AppNavigator from './navigation/AppNavigator';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BackTop } from 'antd';

function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
      <BackTop />
    </Provider>
    
  );
}

export default App;
