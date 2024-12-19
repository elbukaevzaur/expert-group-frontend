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
import {loadFromLocalStorage, saveToLocalStorage} from "@/lib/storage/localStorageCustom";
import {addOrderItems} from "@/lib/http/basketRequest";
import {OrderItemsRequest} from "@/lib/models";

const basketStorageKey = 'basketStorageKey';

function* add(action) {
    const { isAuth } = yield select((state) => state.auth);
    try {
        if (isAuth){
            const { id, count } = yield action.payload;
            const request = {
                productId: id,
                quantity: 1
            }
            yield call(addOrderItems, request);
        }
        yield put(ADD_SAVED(action.payload))
    } catch (e) {

    }
}

function* updateStorage() {
    try {
        const { allItems } = yield select(state => state.basket);
        yield call(saveToLocalStorage, allItems, basketStorageKey);
    } catch (e) {
    }
}

function* initialStorage() {
    try {
        const data = yield call(loadFromLocalStorage, basketStorageKey);
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