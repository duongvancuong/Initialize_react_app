import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import history from './modules/history';

export const sagaMiddleware = createSagaMiddleware();

const middleware = [
  routerMiddleware(history),
  sagaMiddleware,
];

export default middleware;
