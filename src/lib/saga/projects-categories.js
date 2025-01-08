import { all, call, put, takeEvery } from 'redux-saga/effects'
import {getAllProjectsCategories} from "../http/projectsCategoriesRequest";
import {
  PROJECTS_CATEGORIES_FETCH_REQUESTED,
  PROJECTS_CATEGORIES_FETCH_RESPONSE_SUCCESS
} from "../reducers/project-categories";

function* fetchAll() {
  try {
    const response = yield call(getAllProjectsCategories);
    yield put(PROJECTS_CATEGORIES_FETCH_RESPONSE_SUCCESS(response.data))
  } catch (e) {
  }
}


export default function* projectsCategoriesSaga() {
  yield all([
    yield takeEvery(PROJECTS_CATEGORIES_FETCH_REQUESTED, fetchAll),
  ])
}