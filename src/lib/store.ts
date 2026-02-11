import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import {productsSaga, categoriesSaga, basketSaga, authSaga, ordersSaga, favoritesSaga} from '@/lib/saga'
import { all } from 'redux-saga/effects';
import {
    authReducer,
    basketReducer,
    categoriesReducer,
    favoritesReducer,
    ordersReducer,
    productsReducer, projectCategories,
    appReducer,
} from '@/lib/reducers';
import projectsCategoriesSaga from "@/lib/saga/projects-categories";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
    yield all([
        productsSaga(),
        categoriesSaga(),
        basketSaga(),
        authSaga(),
        ordersSaga(),
        favoritesSaga(),
        projectsCategoriesSaga()
    ])
}

export const store = () => {
    const store = configureStore({
        reducer: {
            products: productsReducer,
            categories: categoriesReducer,
            basket: basketReducer,
            auth: authReducer,
            orders: ordersReducer,
            favorites: favoritesReducer,
            projectsCategories: projectCategories,
            app: appReducer
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