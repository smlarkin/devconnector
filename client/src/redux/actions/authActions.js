import jwtDecode from 'jwt-decode'
import { REGISTERED_USER, SET_USER } from '../types'
import { setAuthToken } from '../../utils'
import { clearProfile } from './'

const registeredUser = user => ({
  type: REGISTERED_USER,
  payload: user,
})

export const registerUser = userData => async (
  dispatch,
  getState,
  { axios }
) => {
  try {
    const { data } = await axios.post('/api/users/register', userData)
    return dispatch(registeredUser(data))
  } catch (err) {
    throw err.response.data
  }
}

export const setUser = userData => ({
  type: SET_USER,
  payload: userData,
})

export const loginUser = userData => async (dispatch, getState, { axios }) => {
  try {
    const {
      data: { token },
    } = await axios.post('/api/users/login', userData)
    localStorage.setItem('jwtToken', token)
    setAuthToken(token, axios)
    const decoded = jwtDecode(token)
    return dispatch(setUser(decoded))
  } catch (err) {
    throw err.response.data
  }
}

export const logoutUser = () => async (dispatch, getState, { axios }) => {
  try {
    localStorage.removeItem('jwtToken')
    setAuthToken(false, axios)
    return dispatch(setUser({}))
  } catch (err) {
    throw err.response.data
  }
}

export const setLoggedinUser = async (dispatch, axios) => {
  try {
    if (localStorage.jwtToken) {
      const decoded = jwtDecode(localStorage.jwtToken)
      const currentTime = Date.now() / 1000
      if (decoded.exp < currentTime) {
        dispatch(clearProfile())
        logoutUser()(dispatch, null, { axios })
        window.location.href = '/login'
      } else {
        setAuthToken(localStorage.jwtToken, axios)
        dispatch(setUser(decoded))
      }
    }
  } catch (err) {
    throw err.response.data
  }
}
