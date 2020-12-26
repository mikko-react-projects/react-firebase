import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import reducers from '../reducers/rootReducers';
import sagas from '../sagas/rootSagas';

const persistConfig = {
 key: 'root',
 storage: storage,
};

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
                        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware));

const pReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  pReducer,
  enhancers,
);

sagas.map(sagaMiddleware.run);

export const persistor = persistStore(store);

// export default (initialState) => {
//
//   const sagaMiddleware = createSagaMiddleware();
//
//   const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//                           window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
//
//   const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware));
//
//   const store = createStore(
//     reducers,
//     initialState,
//     enhancers
//   );
//
//   sagas.map(sagaMiddleware.run);
//
//   return store;
// }
