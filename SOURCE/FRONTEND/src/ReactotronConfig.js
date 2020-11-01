import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import apisaucePlugin from "reactotron-apisauce";

const reactotron = Reactotron
    .configure({ name: 'Reactjs Base' })
    .use(reactotronRedux())
    .use(sagaPlugin())
    .use(apisaucePlugin())
    .connect()

export default reactotron