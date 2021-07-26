import {createReducer, createAction} from 'typesafe-actions'
import {createSelector} from 'reselect'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {takeEvery, put, call} from 'redux-saga/effects'

import {fetchUsers} from './api'
import {groupById} from '../utils/collections'

const initialState = {
  byId: {},
  ids: [],
}

// actions

export const USERS_GET = 'USERS_GET'
export const usersFetchRequest = createAction('USERS_GET_REQUESTED', undefined)()
export const usersFetchSuccess = createAction('USERS_GET_SUCCEEDED')()
export const usersFetchFailure = createAction('USERS_GET_GET_FAILED')()

// reducer

const reducer = createReducer(initialState)
  .handleAction(usersFetchSuccess, (state, {payload}) => {

    const {byId, ids} = groupById(payload, 'login.uuid')
    return {
      ...state,
      byId,
      ids,
    }
  })

// store

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(reducer,   applyMiddleware(sagaMiddleware))

sagaMiddleware.run(watchGetUsers)

// selectors

const usersById = (state) => state.byId
const usersIds = (state) => state.ids

export const getUsers = createSelector(usersById, usersIds, (byId, ids) =>
  ids.map((id) => byId[id])
)

// redux-saga
function* workerGetUsers() {
  const data = yield call(fetchUsers)

  yield put(usersFetchSuccess(data.results))
}

export function* watchGetUsers() {
  yield takeEvery(usersFetchRequest, workerGetUsers)
}