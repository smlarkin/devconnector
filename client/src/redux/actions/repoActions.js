import { SET_REPOS } from '../types'
import { clientId, clientSecret } from './../../secrets'

const setRepos = repos => ({
  type: SET_REPOS,
  payload: repos,
})

export const getRepos = githubUserName => async (
  dispatch,
  getState,
  { axios }
) => {
  try {
    const sort = 'created: asc'
    const count = 5
    const res = await fetch(
      `https://api.github.com/users/${githubUserName}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
    const repos = await res.json()
    return dispatch(setRepos(repos))
  } catch (err) {
    throw err.response.data
  }
}
