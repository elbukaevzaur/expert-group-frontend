import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { ADD_FILTER, PRODUCTS_FETCH_REQUESTED, PRODUCTS_FETCH_RESPONSE_SUCCESS, PRODUCTS_SHOW_MORE_FETCH_REQUESTED, PRODUCTS_SHOW_MORE_FETCH_RESPONSE_SUCCESS } from '../reducers/products'
import { getAll } from '../http/productsRequest';

function* fetchAll() {
  const pageRequest = yield select(state => state.products.pageRequest);
  try {
    const response = yield call(getAll, pageRequest);
    yield put(PRODUCTS_FETCH_RESPONSE_SUCCESS(response.data))
  } catch (e) {
  }
}

function* getAllSaga() {
  yield takeEvery(PRODUCTS_FETCH_REQUESTED, fetchAll)
}

function* fetchShowMoreProducts() {
  const pageRequest = yield select(state => state.products.pageRequest);
  try {
    const response = yield call(getAll, pageRequest);
    yield put(PRODUCTS_SHOW_MORE_FETCH_RESPONSE_SUCCESS(response.data))
  } catch (e) {
  }
}

function* getAllShowMoreSaga() {
  yield takeEvery(PRODUCTS_SHOW_MORE_FETCH_REQUESTED, fetchShowMoreProducts)
  yield takeEvery(ADD_FILTER, fetchAll)
}

export default function* productsSaga() {
  yield all([
    getAllSaga(),
    getAllShowMoreSaga()
  ])
}