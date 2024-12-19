import { all, put, takeEvery, call } from 'redux-saga/effects'
import {
    BASKET_CLEAR,
    CREATE_ORDER_REQUEST, CREATE_ORDER_RESPONSE_SUCCESS,
} from '../reducers'
import {createOrderRequest} from "../http/ordersRequest";

function* createOrderWorker() {
    try {
        const response = yield call(createOrderRequest);
        yield put(CREATE_ORDER_RESPONSE_SUCCESS(response.data));
        yield put(BASKET_CLEAR());
    } catch (e) {

    }
}
export default function* ordersSaga() {
    yield all([
        yield takeEvery(CREATE_ORDER_REQUEST, createOrderWorker)
    ])
}