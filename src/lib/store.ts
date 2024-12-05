import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import productsReducer from './reducers/products';
import createSagaMiddleware from 'redux-saga';
import productsSaga from './saga/products';

const sagaMiddleware = createSagaMiddleware();

export const store = () => {
    const store = configureStore({
        reducer: {
            products: productsReducer
        },
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(sagaMiddleware),
    });

    sagaMiddleware.run(productsSaga); // Запустите вашу сагу

    return store;
};

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']