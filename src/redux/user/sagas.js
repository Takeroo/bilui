import { all, takeEvery, put, call } from 'redux-saga/effects'
import { notification } from 'antd'
import { authService } from '../../services'
import actions from './actions'

export function* LOGIN({ payload }) {
  const { email, password } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(authService.login, email, password)
  if (success) {
    notification.success({
      message: 'Logged In',
      description: 'You have successfully logged in!',
    })
    yield put({
      type: 'user/LOAD_CURRENT_ACCOUNT',
    })
  }
  else{
    yield put({
      payload: {
        loading: true,
      }
    })
  }
}

export function* LOAD_CURRENT_ACCOUNT() {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })

  try {
    const response = yield call(authService.currentAccount)
    if (response) {
      const { id, name, email,  avatar } = response
      yield put({
        type: 'user/SET_STATE',
        payload: {
          id,
          name,
          email,
          avatar,
          role: 'admin',
          authorized: true,
        },
      })
    }
  }
  catch(error) {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* LOGOUT() {
  yield call(authService.logout)
  yield put({
    type: 'user/SET_STATE',
    payload: {
      id: '',
      name: '',
      role: '',
      email: '',
      avatar: '',
      authorized: false,
      loading: false,
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOGIN, LOGIN),
    takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    takeEvery(actions.LOGOUT, LOGOUT),
    LOAD_CURRENT_ACCOUNT(), // run once on app load to check user auth
  ])
}
