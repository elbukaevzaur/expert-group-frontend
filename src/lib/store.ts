import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import {productsSaga, categoriesSaga, basketSaga, authSaga, ordersSaga} from '@/lib/saga'
import { all } from 'redux-saga/effects';
import {authReducer, basketReducer, categoriesReducer, ordersReducer, productsReducer} from '@/lib/reducers';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
    yield all([
        productsSaga(),
        categoriesSaga(),
        basketSaga(),
        authSaga(),
        ordersSaga()
    ])
}

export const store = () => {
    const store = configureStore({
        reducer: {
            products: productsReducer,
            categories: categoriesReducer,
            basket: basketReducer,
            auth: authReducer,
            orders: ordersReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([sagaMiddleware]),
    });

    sagaMiddleware.run(rootSaga);

    return store;
};

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']