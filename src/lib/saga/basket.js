import { all, put, takeEvery, select, call } from 'redux-saga/effects'
import {
    ADD_SAVE,
    ADD_SAVED,
    INITIAL_BASKET,
    INITIAL_BASKET_SUCCESS,
    REMOVE,
    REMOVE_ALL,
    REMOVE_COUNT
} from '../reducers'

const basketStorageKey = 'basketStorageKey';

const saveToLocalStorage = (value) => {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(basketStorageKey, serializedState);
    } catch (e) {
        console.warn(e);
    }
};

// Функция для получения данных из localStorage
const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem(basketStorageKey);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

function* add(action) {
    try {
        yield put(ADD_SAVED(action.payload))
    } catch (e) {
    }
}

function* updateStorage() {
    try {
        const { allItems } = yield select(state => state.basket);
        yield call(saveToLocalStorage, allItems);
    } catch (e) {
    }
}

function* initialStorage() {
    try {
        const data = yield call(loadFromLocalStorage);
        if (data) {
            yield put(INITIAL_BASKET_SUCCESS(data));
        }
    } catch (e) {
    }
}

export default function* basketSaga() {
    yield all([
        yield takeEvery(ADD_SAVE, add),
        yield takeEvery([ADD_SAVED, REMOVE_COUNT, REMOVE, REMOVE_ALL], updateStorage),
        yield takeEvery(INITIAL_BASKET, initialStorage)
    ])
}