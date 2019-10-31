import { createStore, applyMiddleware,combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import {reducer as form} from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import {ReducerBalance,ReducerSearch,ReducerList,ReducerEdit_contact,ReducerLogin,ReducerVisit,ReducerUpdate_Visit,ReducerAnswer,ReducerSetDeviceToken,ReducerSetContacts,ReducerMenu,ReducerLanguage} from './Reducers'
import functionP from './Sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  timeout: 0,
};
const reducers = combineReducers({
	ReducerSearch,
    ReducerBalance,
    ReducerList,
    ReducerEdit_contact,
    ReducerLogin,
    ReducerVisit,
    ReducerUpdate_Visit,
    ReducerAnswer,
    ReducerSetDeviceToken,
    ReducerSetContacts,
    ReducerMenu,
    ReducerLanguage,
    form,
})
const persistedReducer = persistReducer(persistConfig, reducers);


export  const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
export const persistor = persistStore(store);

  sagaMiddleware.run(functionP);


