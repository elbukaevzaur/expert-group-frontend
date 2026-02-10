import { all, put, takeEvery, call, select } from 'redux-saga/effects'
import {
    ALL_FAVORITES_REQUEST,
    ALL_FAVORITES_RESPONSE_SUCCESS,
    CHANGE_FAVORITES_REQUEST,
    CHANGE_FAVORITES_RESPONSE_SUCCESS,
    FAVORITE_PRODUCTS_FETCH_REQUESTED,
    SIGN_OUT
} from '../reducers'

import {changeFavoriteProduct, getAllFavoritesForMe} from "../http/favoritesRequest";
import {loadFromLocalStorage, saveToLocalStorage} from "@/lib/storage/localStorageCustom";
import {favoritesStorageKey} from "@/lib/config";

function* allFavoritesRequestWorker() {
    const { isAuth } = yield select((state) => state.auth);
    try {
        if (isAuth){
            const response = yield call(getAllFavoritesForMe);
            yield put(ALL_FAVORITES_RESPONSE_SUCCESS(response.data))
        }else {
            const data = yield call(loadFromLocalStorage, favoritesStorageKey);
            if (data) {
                yield put(ALL_FAVORITES_RESPONSE_SUCCESS(data));
            } else {
                yield put(ALL_FAVORITES_RESPONSE_SUCCESS({}))
            }
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            yield put(SIGN_OUT());
        }
    }
}

function* changeFavoritesRequestWorker(action) {
    const { isAuth } = yield select((state) => state.auth);
    try {
        if (isAuth) {
            yield call(changeFavoriteProduct, action.payload);
        }
        yield put(CHANGE_FAVORITES_RESPONSE_SUCCESS(action.payload))
    } catch (e) {
        if (e.response && e.response.status === 401) {
            yield put(SIGN_OUT());
        }
    }
}

function* updateFavoritesStorage() {
    try {
        const { isAuth } = yield select((state) => state.auth);
        if (!isAuth) {
            const { allFavorites } = yield select(state => state.favorites);
            yield call(saveToLocalStorage, allFavorites, favoritesStorageKey);
            // Refresh product details for guests
            yield put(FAVORITE_PRODUCTS_FETCH_REQUESTED());
        }
    } catch (e) {
    }
}

export default function* favoritesSaga() {
    yield all([
        yield takeEvery(ALL_FAVORITES_REQUEST, allFavoritesRequestWorker),
        yield takeEvery(CHANGE_FAVORITES_REQUEST, changeFavoritesRequestWorker),
        yield takeEvery(CHANGE_FAVORITES_RESPONSE_SUCCESS, updateFavoritesStorage),
    ])
}