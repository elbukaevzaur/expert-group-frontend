import { all, put, takeEvery, call } from 'redux-saga/effects'
import {
    ALL_ORDERS_REQUEST, ALL_ORDERS_RESPONSE_SUCCESS,
    BASKET_CLEAR,
    CREATE_ORDER_REQUEST, CREATE_ORDER_RESPONSE_SUCCESS, CURRENT_ORDERS_REQUEST, CURRENT_ORDERS_RESPONSE_SUCCESS,
} from '@/lib/reducers'
import {createOrderRequest, findMeAllOrdersRequest, findMeCurrentOrdersRequest} from "@/lib/http/ordersRequest";

function* createOrderWorker(action) {
    try {
        const response = yield call(createOrderRequest, action.payload);
        yield put(CREATE_ORDER_RESPONSE_SUCCESS(response.data));
        yield put(BASKET_CLEAR());
        // Обновляем список текущих заказов после создания нового заказа
        yield put(CURRENT_ORDERS_REQUEST());
    } catch (e) {

    }
}

function* currentOrdersRequestWorker(){
    try {
        const response = yield call(findMeCurrentOrdersRequest);
        if (response.data)
            yield put(CURRENT_ORDERS_RESPONSE_SUCCESS(response.data))
    }catch (e){
        console.log(e)
    }
}

function* allOrdersRequestWorker(){
    try {
        const response = yield call(findMeAllOrdersRequest);
        if (response.data)
            yield put(ALL_ORDERS_RESPONSE_SUCCESS(response.data))
    }catch (e){}
}

export default function* ordersSaga() {
    yield all([
        yield takeEvery(CREATE_ORDER_REQUEST, createOrderWorker),
        yield takeEvery(CURRENT_ORDERS_REQUEST, currentOrdersRequestWorker),
        yield takeEvery(ALL_ORDERS_REQUEST, allOrdersRequestWorker)
    ])
}