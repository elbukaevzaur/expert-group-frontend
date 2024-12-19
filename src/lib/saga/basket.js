import { all, put, takeEvery, select, call } from 'redux-saga/effects'
import {
    ORDER_ITEMS_INCREMENT,
    ORDER_ITEMS_INCREMENT_SUCCESS,
    INITIAL_BASKET,
    INITIAL_BASKET_SUCCESS,
    REMOVE,
    BASKET_CLEAR,
    ORDER_ITEMS_DECREMENT,
    ORDER_ITEMS_DECREMENT_SUCCESS,
    UPDATE_STORAGE,
    UPDATE_FOR_API,
    ORDER_ITEMS_DETAILS_REQUEST,
    ORDER_ITEMS_DETAILS_RESPONSE_SUCCESS
} from '../reducers'
import {
    loadFromLocalStorage,
    clearFromLocalStorage,
    saveToLocalStorage
} from "@/lib/storage/localStorageCustom";
import {
    addOrderItems,
    basketCleanRequest,
    getAllBasketItemsDetails,
    getAllOrderItems,
    removeByProductId
} from "@/lib/http/basketRequest";

const basketStorageKey = 'basketStorageKey';

function* incrementQuantityWorker(action) {
    const { isAuth } = yield select((state) => state.auth);
    try {
        if (isAuth){
            yield call(addOrderItems, [action.payload]);
        }
        yield put(ORDER_ITEMS_INCREMENT_SUCCESS(action.payload))
    } catch (e) {

    }
}

function* decrementQuantityWorker(action) {
    const { isAuth } = yield select((state) => state.auth);
    try {
        if (isAuth){
            yield call(addOrderItems, [action.payload]);
        }
        yield put(ORDER_ITEMS_DECREMENT_SUCCESS(action.payload))
    } catch (e) {

    }
}

function* updateStorage() {
    try {
        const { orderItems } = yield select(state => state.basket);
        yield call(saveToLocalStorage, orderItems, basketStorageKey);
    } catch (e) {
    }
}

function* updateForApi() {
    try {
        const data = yield call(loadFromLocalStorage, basketStorageKey);
        if (data){
            yield call(addOrderItems, data);
        }
        yield put(INITIAL_BASKET());
    } catch (e){
    }
}

function* initialStorage() {
    try {
        const { isAuth } = yield select((state) => state.auth);
        if (isAuth){
            const response = yield call(getAllOrderItems);
            yield put(INITIAL_BASKET_SUCCESS(response.data));
            yield put(UPDATE_STORAGE());
            yield put(ORDER_ITEMS_DETAILS_REQUEST());
        }else {
            const data = yield call(loadFromLocalStorage, basketStorageKey);
            if (data) {
                yield put(INITIAL_BASKET_SUCCESS(data));
            }
        }
    } catch (e) {
    }
}

function* orderItemsDetailsRequestWorker() {
    try {
        const { orderItems } = yield select(state => state.basket);
        const response = yield call(getAllBasketItemsDetails, {productIds: orderItems.map(m => m.productId)});
        yield put(ORDER_ITEMS_DETAILS_RESPONSE_SUCCESS(response.data))
    } catch (e) {
    }
}

function* removeByProductIdRequestWorker(action) {
    try {
        yield call(removeByProductId, action.payload);
        yield put(UPDATE_STORAGE())
    } catch (e) {
    }
}

function* basketCleanWorker() {
    try {
        yield call(basketCleanRequest);
        yield call(clearFromLocalStorage, basketStorageKey);
    } catch (e) {
    }
}

export default function* basketSaga() {
    yield all([
        yield takeEvery(ORDER_ITEMS_INCREMENT, incrementQuantityWorker),
        yield takeEvery(ORDER_ITEMS_DECREMENT, decrementQuantityWorker),
        yield takeEvery([ORDER_ITEMS_INCREMENT_SUCCESS, ORDER_ITEMS_DECREMENT_SUCCESS], updateStorage),
        yield takeEvery(INITIAL_BASKET, initialStorage),
        yield takeEvery(UPDATE_STORAGE, updateStorage),
        yield takeEvery(BASKET_CLEAR, basketCleanWorker),
        yield takeEvery(UPDATE_FOR_API, updateForApi),
        yield takeEvery(ORDER_ITEMS_DETAILS_REQUEST, orderItemsDetailsRequestWorker),
        yield takeEvery(REMOVE, removeByProductIdRequestWorker),
    ])
}