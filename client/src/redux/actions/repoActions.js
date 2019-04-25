import { SET_REPOS } from '../types'

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
    const { data } = await axios.post('/api/keys/repos', { githubUserName })
    return dispatch(setRepos(data))
  } catch (err) {
    throw err.response.data
  }
}
