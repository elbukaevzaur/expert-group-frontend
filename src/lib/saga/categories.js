import { all, call, put, takeEvery } from 'redux-saga/effects'
import {
  CATEGORIES_FETCH_REQUESTED,
  CATEGORIES_FETCH_RESPONSE_SUCCESS,
  SUB_CATEGORIES_FETCH_REQUESTED, SUB_CATEGORIES_FETCH_RESPONSE_SUCCESS
} from '../reducers/categories'
import { getAll } from '../http/categoriesRequest';

function* fetchAll(action) {
  try {
    const response = yield call(getAll);
    yield put(CATEGORIES_FETCH_RESPONSE_SUCCESS(response.data))
  } catch (e) {
  }
}

function* fetchSubCategories(action) {
  try {
    const response = yield call(getAll, action.payload);
    yield put(SUB_CATEGORIES_FETCH_RESPONSE_SUCCESS(response.data))
  } catch (e) {
  }
}

export default function* categoriesSaga() {
  yield all([
    yield takeEvery(CATEGORIES_FETCH_REQUESTED, fetchAll),
    yield takeEvery(SUB_CATEGORIES_FETCH_REQUESTED, fetchSubCategories)
  ])
}