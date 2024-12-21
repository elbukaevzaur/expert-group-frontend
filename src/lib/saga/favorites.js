import { all, put, takeEvery, call, select } from 'redux-saga/effects'
import {
    ALL_FAVORITES_REQUEST,
    ALL_FAVORITES_RESPONSE_SUCCESS,
    CHANGE_FAVORITES_REQUEST,
    CHANGE_FAVORITES_RESPONSE_SUCCESS
} from '../reducers'

import {changeFavoriteProduct, getAllFavoritesForMe} from "../http/favoritesRequest";

function* allFavoritesRequestWorker() {
    const { isAuth } = yield select((state) => state.auth);
    try {
        if (isAuth){
            const response = yield call(getAllFavoritesForMe);
            yield put(ALL_FAVORITES_RESPONSE_SUCCESS(response.data))
        }else {
            yield put(ALL_FAVORITES_RESPONSE_SUCCESS({}))
        }
    } catch (e) {
    }
}

function* changeFavoritesRequestWorker(action) {
    try {
        yield call(changeFavoriteProduct, action.payload);
        yield put(CHANGE_FAVORITES_RESPONSE_SUCCESS(action.payload))
    } catch (e) {
    }
}

export default function* favoritesSaga() {
    yield all([
        yield takeEvery(ALL_FAVORITES_REQUEST, allFavoritesRequestWorker),
        yield takeEvery(CHANGE_FAVORITES_REQUEST, changeFavoritesRequestWorker),
    ])
}