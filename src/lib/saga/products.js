import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { PRODUCTS_FETCH_REQUESTED, PRODUCTS_FETCH_RESPONSE_SUCCESS } from '../reducers/products'
import { getAll } from '../http/productsRequest';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
  try {

    const response = yield call(getAll);
    console.log(response)
    // const user = yield call(Api.fetchUser, action.payload.userId)
    // yield put({ type: PRODUCTS_FETCH_RESPONSE_SUCCESS, user: user })
  } catch (e) {
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* productsSaga() {
  yield takeEvery(PRODUCTS_FETCH_REQUESTED, fetchUser)
}

export default productsSaga