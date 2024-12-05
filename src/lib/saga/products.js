import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { PRODUCTS_FETCH_REQUESTED, PRODUCTS_FETCH_RESPONSE_SUCCESS } from '../reducers/products'
import { getAll } from '../http/productsRequest';

function* fetchUser(action) {
  try {
    const response = yield call(getAll);
    yield put(PRODUCTS_FETCH_RESPONSE_SUCCESS(response.data))
  } catch (e) {
  }
}

function* productsSaga() {
  yield takeEvery(PRODUCTS_FETCH_REQUESTED, fetchUser)
}

export default productsSaga