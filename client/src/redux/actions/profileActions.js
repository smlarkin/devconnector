import {
  SET_PROFILE,
  LOADING_PROFILE,
  CLEAR_PROFILE,
  SET_PROFILES,
} from '../types'
import { setUser } from './'

const loadingProfile = () => ({
  type: LOADING_PROFILE,
})

const setProfile = profile => ({
  type: SET_PROFILE,
  payload: profile,
})

export const clearProfile = () => ({
  type: CLEAR_PROFILE,
})

const setProfiles = profiles => ({
  type: SET_PROFILES,
  payload: profiles,
})

export const createProfile = profileData => async (
  dispatch,
  getState,
  { axios }
) => {
  try {
    dispatch(loadingProfile())
    const { data } = await axios.post('/api/profiles', profileData)
    return dispatch(setProfile(data))
  } catch (err) {
    throw err.response.data
  }
}

export const getProfile = () => async (dispatch, getState, { axios }) => {
  try {
    dispatch(loadingProfile())
    const { data } = await axios.get('/api/profiles')
    return dispatch(setProfile(data))
  } catch (err) {
    return dispatch(setProfile({}))
  }
}

export const deleteAccount = () => async (dispatch, getState, { axios }) => {
  try {
    if (window.confirm('Are you sure? This CANNOT be undone!')) {
      dispatch(loadingProfile())
      const { data } = await axios.delete('/api/profiles')
      console.log('delete success', data.success)
      localStorage.removeItem('jwtToken')
      return dispatch(setUser({}))
    }
  } catch (err) {
    throw err.response.data
  }
}

export const addExperience = experienceData => async (
  dispatch,
  getState,
  { axios }
) => {
  try {
    dispatch(loadingProfile())
    const { data } = await axios.post(
      '/api/profiles/experience',
      experienceData
    )
    return dispatch(setProfile(data))
  } catch (err) {
    throw err.response.data
  }
}

export const deleteExperience = experienceId => async (
  dispatch,
  getState,
  { axios }
) => {
  try {
    dispatch(loadingProfile())
    const { data } = await axios.delete(
      `/api/profiles/experience/${experienceId}`
    )
    return dispatch(setProfile(data))
  } catch (err) {
    throw err.response.data
  }
}

export const addEducation = educationData => async (
  dispatch,
  getState,
  { axios }
) => {
  try {
    dispatch(loadingProfile())
    const { data } = await axios.post('/api/profiles/education', educationData)
    return dispatch(setProfile(data))
  } catch (err) {
    throw err.response.data
  }
}

export const deleteEducation = educationId => async (
  dispatch,
  getState,
  { axios }
) => {
  try {
    dispatch(loadingProfile())
    const { data } = await axios.delete(
      `/api/profiles/education/${educationId}`
    )
    return dispatch(setProfile(data))
  } catch (err) {
    throw err.response.data
  }
}

export const getProfiles = () => async (dispatch, getState, { axios }) => {
  try {
    dispatch(loadingProfile())
    const { data } = await axios.get('/api/profiles/all')
    return dispatch(setProfiles(data))
  } catch (err) {
    dispatch(setProfiles(null))
    throw err.response.data
  }
}

export const getProfileByHandle = handle => async (
  dispatch,
  getState,
  { axios }
) => {
  try {
    dispatch(loadingProfile())
    const { data } = await axios.get(`/api/profiles/handle/${handle}`)
    return dispatch(setProfile(data))
  } catch (err) {
    dispatch(setProfile(null))
    throw err.response.data
  }
}
