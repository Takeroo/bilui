import { all, takeEvery, put, call } from 'redux-saga/effects'
import { articleService } from '../../services'
import actions from './actions'

export function* CLAP_ARTICLE({ payload, callback }) {
  const { articleId } = payload
  yield put({
    type: 'clap/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const response = yield call(articleService.clapArticle, articleId)
    yield put({
      type: 'clap/SET_STATE',
      payload: {
        clappedArticleIds: response,
        loading: false,
      },
    })
    yield callback()
  }
  catch(e) {
    yield put({
      type: 'clap/SET_STATE',
      payload: {
        loading: false,
      }
    })
  }
}

export function* LOAD_CLAPS() {
  yield put({
    type: 'clap/SET_STATE',
    payload: {
      loading: true,
    },
  })

  try {
    const response = yield call(articleService.getClappedArticleIds)
    if (response) {
      yield put({
        type: 'clap/SET_STATE',
        payload: {
          clappedArticleIds: response,
          loading: false,
        },
      })
    }
  }
  catch(error) {
    yield put({
      type: 'clap/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.CLAP_ARTICLE, CLAP_ARTICLE),
    takeEvery(actions.LOAD_CLAPS, LOAD_CLAPS),
    LOAD_CLAPS(), // run once on app load to check user auth
  ])
}
