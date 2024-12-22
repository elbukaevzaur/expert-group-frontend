import { all, put, takeEvery, call } from 'redux-saga/effects'
import {
    ALL_FAVORITES_REQUEST,
    BASKET_CLEAR, INITIAL_BASKET,
    INITIAL_TOKEN,
    SIGN_IN_REQUEST,
    SIGN_IN_RESPONSE_ERROR,
    SIGN_IN_RESPONSE_SUCCESS,
    SIGN_OUT,
    SIGN_OUT_SUCCESS
} from '../reducers'
import {signIn} from "@/lib/http/authRequest";
import {loadFromLocalStorage, clearFromLocalStorage, saveToLocalStorage} from "@/lib/storage/localStorageCustom";

const authStorageKey = 'authToken';

function* signInWorker(action) {
    try {
        const response = yield call(signIn, action.payload);
        yield call(saveToLocalStorage, response.data, authStorageKey);
        yield put(SIGN_IN_RESPONSE_SUCCESS(response.data))
    } catch (e) {
        yield put(SIGN_IN_RESPONSE_ERROR())
    }
}

function* initialToken() {
    try {
        const data = yield call(loadFromLocalStorage, authStorageKey);
        if (data) {
            yield put(SIGN_IN_RESPONSE_SUCCESS(data));
            yield put(INITIAL_BASKET())
            // yield put(ALL_FAVORITES_REQUEST())
        }else {
            // yield put(INITIAL_BASKET())
        }
    } catch (e) {
    }
}

function* signOutWorker() {
    try {
        yield call(clearFromLocalStorage, authStorageKey);
        yield put(SIGN_OUT_SUCCESS())
        yield put(BASKET_CLEAR())
        yield put(ALL_FAVORITES_REQUEST())
    } catch (e) {
    }
}


export default function* authSaga() {
    yield all([
        yield takeEvery(SIGN_IN_REQUEST, signInWorker),
        yield takeEvery(INITIAL_TOKEN, initialToken),
        yield takeEvery(SIGN_OUT, signOutWorker)
    ])
}