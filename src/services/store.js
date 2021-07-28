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
  searchText: '',
}

// actions

export const USERS_GET = 'USERS_GET'
export const usersFetchRequest = createAction('USERS_GET_REQUESTED', undefined)()
export const usersFetchSuccess = createAction('USERS_GET_SUCCEEDED')()
export const usersFetchFailure = createAction('USERS_GET_GET_FAILED')()

export const setUserStatusById = createAction('SET_USER_STATUS_BY_ID', (id, time) => ({id, time}))()
export const setSearchText = createAction('SET_SEARCH_TEXT', (text) => text)()

// reducer

const reducer = createReducer(initialState)
  .handleAction(usersFetchSuccess, (state, {payload}) => {
    const {byId, ids} = groupById(payload, 'id.value')

    return {
      ...state,
      byId,
      ids,
    }
  })
  .handleAction(setUserStatusById, (state, {payload: {id, time}}) => ({
    ...state,
    byId: {
      ...state.byId,
      [id]: {
        ...state.byId[id],
        checkedAt: time
      }
    },
  }))
  .handleAction(setSearchText, (state, {payload}) => ({
    ...state,
    searchText: payload.toLowerCase(),
  }))

// store

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(reducer,   applyMiddleware(sagaMiddleware))

sagaMiddleware.run(watchGetUsers)

// selectors

const usersById = (state) => state.byId
const usersIds = (state) => state.ids
export const getSearchText = (state) => state.searchText

export const getUsers = createSelector(usersById, usersIds, (byId, ids) =>
  ids.map((id) => byId[id])
)

export const getCheckedUsers = createSelector(getUsers, (users) => users.filter((user) => user.checkedAt)
)

// redux-saga
function* workerGetUsers() {
  try {
    const data = yield call(fetchUsers)

    yield put(usersFetchSuccess(data.results))
  } catch (err) {
    yield put(usersFetchFailure())
  }
}

export function* watchGetUsers() {
  yield takeEvery(usersFetchRequest, workerGetUsers)
}