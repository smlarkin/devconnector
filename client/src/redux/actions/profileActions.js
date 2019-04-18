import { SET_PROFILE, LOADING_PROFILE, CLEAR_PROFILE } from '../types'

const loadingProfile = () => ({
  type: LOADING_PROFILE,
})

const setProfile = profile => ({
  type: SET_PROFILE,
  payload: profile,
})

export const getProfile = () => async (dispatch, getState, { axios }) => {
  try {
    dispatch(loadingProfile())

    const { data } = await axios.get('/api/profile')

    return dispatch(setProfile(data))
  } catch (err) {
    // throw err.response.data
    return dispatch(setProfile({}))
  }
}

export const clearProfile = () => ({
  type: CLEAR_PROFILE,
})

export const createProfile = profileData => async (
  dispatch,
  getState,
  { axios }
) => {
  try {
    // dispatch(loadingProfile())
    const { data } = await axios.post('/api/profiles', profileData)
    return dispatch(setProfile(data))
  } catch (err) {
    throw err.response.data
  }
}
