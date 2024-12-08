import { all, put, takeEvery } from 'redux-saga/effects'
import { ADD_SAVE, ADD_SAVED } from '../reducers'

function* add(action) {
    try {
        yield put(ADD_SAVED(action.payload))
    } catch (e) {
    }
}

function* getAllSaga() {
    yield takeEvery(ADD_SAVE, add)
}

export default function* basketSaga() {
    yield all([
        getAllSaga(),
    ])
}