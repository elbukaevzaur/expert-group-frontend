import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import {
  ADD_FILTER,
  FILTERS_FETCH_REQUESTED, FILTERS_FETCH_RESPONSE_SUCCESS,
  PRODUCTS_FETCH_REQUESTED,
  PRODUCTS_FETCH_RESPONSE_SUCCESS,
  PRODUCTS_SHOW_MORE_FETCH_REQUESTED,
  PRODUCTS_SHOW_MORE_FETCH_RESPONSE_SUCCESS, SORTED
} from '@/lib/reducers/products'
import { getAll } from '@/lib/http/productsRequest';
import {getAllFilters} from "@/lib/http/filtersRequest";

function* fetchAll() {
  const pageRequest = yield select(state => state.products.pageRequest);
  try {
    const response = yield call(getAll, pageRequest);
    yield put(PRODUCTS_FETCH_RESPONSE_SUCCESS(response.data))
  } catch (e) {
  }
}

function* fetchShowMoreProducts() {
  const pageRequest = yield select(state => state.products.pageRequest);
  try {
    const response = yield call(getAll, pageRequest);
    yield put(PRODUCTS_SHOW_MORE_FETCH_RESPONSE_SUCCESS(response.data))
  } catch (e) {
  }
}

function* fetchAllFiltersData(action) {
  try {
    const response = yield call(getAllFilters, action.payload);
    yield put(FILTERS_FETCH_RESPONSE_SUCCESS(response.data))
  } catch (e) {
  }
}

export default function* productsSaga() {
  yield all([
    yield takeEvery(PRODUCTS_FETCH_REQUESTED, fetchAll),
    yield takeEvery(PRODUCTS_SHOW_MORE_FETCH_REQUESTED, fetchShowMoreProducts),
    yield takeEvery(ADD_FILTER, fetchAll),
    yield takeEvery(SORTED, fetchAll),
    yield takeEvery(FILTERS_FETCH_REQUESTED, fetchAllFiltersData)
  ])
}