import React from 'react';
import './App.css';
import store from "./redux/store";
import { Provider } from "react-redux";
import AppNavigator from './navigation/AppNavigator';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
