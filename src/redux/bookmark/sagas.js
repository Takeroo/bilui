import { all, takeEvery, put, call } from 'redux-saga/effects'
import { articleService } from '../../services'
import actions from './actions'

export function* BOOKMARK_ARTICLE({ payload }) {
  const { articleId } = payload
  yield put({
    type: 'bookmark/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const response = yield call(articleService.saveArticle, articleId)
  if (response) {
    yield put({
      type: 'bookmark/SET_STATE',
      payload: {
        savedArticleIds: response,
        loading: false,
      },
    })
  }
  else{
    yield put({
      payload: {
        loading: false,
      }
    })
  }
}

export function* LOAD_BOOKMARKS() {
  yield put({
    type: 'bookmark/SET_STATE',
    payload: {
      loading: true,
    },
  })

  try {
    const response = yield call(articleService.getSavedArticles)
    if (response) {
      yield put({
        type: 'bookmark/SET_STATE',
        payload: {
          savedArticleIds: response,
          loading: false,
        },
      })
    }
  }
  catch(error) {
    yield put({
      type: 'bookmark/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.BOOKMARK_ARTICLE, BOOKMARK_ARTICLE),
    takeEvery(actions.LOAD_BOOKMARKS, LOAD_BOOKMARKS),
    LOAD_BOOKMARKS(), // run once on app load to check user auth
  ])
}
