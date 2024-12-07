import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { PRODUCTS_FETCH_REQUESTED, PRODUCTS_FETCH_RESPONSE_SUCCESS, PRODUCTS_SHOW_MORE_FETCH_REQUESTED, PRODUCTS_SHOW_MORE_FETCH_RESPONSE_SUCCESS } from '../reducers/products'
import { getAll } from '../http/productsRequest';

function* fetchProducts(action) {
  try {
    const response = yield call(getAll, action.payload);
    yield put(PRODUCTS_FETCH_RESPONSE_SUCCESS(response.data))
  } catch (e) {
  }
}

function* getAllSaga() {
  yield takeEvery(PRODUCTS_FETCH_REQUESTED, fetchProducts)
}

function* fetchShowMoreProducts(action) {
  try {
    const response = yield call(getAll, action.payload);
    yield put(PRODUCTS_SHOW_MORE_FETCH_RESPONSE_SUCCESS(response.data))
  } catch (e) {
  }
}

function* getAllShowMoreSaga() {
  yield takeEvery(PRODUCTS_SHOW_MORE_FETCH_REQUESTED, fetchShowMoreProducts)
}

export default function* productsSaga() {
  yield all([
    getAllSaga(),
    getAllShowMoreSaga()
  ])
}