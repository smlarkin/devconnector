import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import profileReducer from './profileReducer'
import repoReducer from './repoReducer'
import postReducer from './postReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  profile: profileReducer,
  repo: repoReducer,
  post: postReducer,
})

export default rootReducer
