import { SET_REPOS } from '../types'

const initialState = []

const repoReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_REPOS:
      return payload
    default:
      return state
  }
}

export default repoReducer
