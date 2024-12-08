import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './reducers/products';
import categoriesReducer from './reducers/categories';
import createSagaMiddleware from 'redux-saga';
import productsSaga from './saga/products';
import categoriesSaga from './saga/categories';
import { all } from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
    yield all([
        productsSaga(),
        categoriesSaga()
    ])
}

export const store = () => {
    const store = configureStore({
        reducer: {
            products: productsReducer,
            categories: categoriesReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([sagaMiddleware]),
    });

    sagaMiddleware.run(rootSaga,);

    return store;
};

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']