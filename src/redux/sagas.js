import { all } from 'redux-saga/effects'
import user from './user/sagas'
import menu from './menu/sagas'
import settings from './settings/sagas'
import bookmark from './bookmark/sagas'
import clap from './clap/sagas'

export default function* rootSaga() {
  yield all([user(), menu(), settings(), bookmark(), clap()])
}
