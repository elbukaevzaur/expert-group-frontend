import { all, call, put, takeEvery } from 'redux-saga/effects'
import {
  CATEGORIES_FETCH_REQUESTED,
  CATEGORIES_FETCH_RESPONSE_SUCCESS, CURRENT_CATEGORY_FETCH_REQUESTED,
  CURRENT_CATEGORY_FETCH_RESPONSE_SUCCESS,
  CURRENT_SUB_CATEGORY_FETCH_REQUESTED,
  CURRENT_SUB_CATEGORY_FETCH_RESPONSE_SUCCESS,
  SUB_CATEGORIES_FETCH_REQUESTED,
  SUB_CATEGORIES_FETCH_RESPONSE_SUCCESS
} from '../reducers/categories'
import {get, getAll} from '../http/categoriesRequest';

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

function* fetchCurrentCategory(action) {
  try {
    const response = yield call(get, action.payload);
    yield put(CURRENT_CATEGORY_FETCH_RESPONSE_SUCCESS(response.data))
  } catch (e) {
  }
}

function* fetchCurrentSubCategory(action) {
  try {
    const response = yield call(get, action.payload);
    yield put(CURRENT_SUB_CATEGORY_FETCH_RESPONSE_SUCCESS(response.data))
  } catch (e) {
  }
}

export default function* categoriesSaga() {
  yield all([
    yield takeEvery(CATEGORIES_FETCH_REQUESTED, fetchAll),
    yield takeEvery(SUB_CATEGORIES_FETCH_REQUESTED, fetchSubCategories),
    yield takeEvery(CURRENT_CATEGORY_FETCH_REQUESTED, fetchCurrentCategory),
    yield takeEvery(CURRENT_SUB_CATEGORY_FETCH_REQUESTED, fetchCurrentSubCategory)
  ])
}