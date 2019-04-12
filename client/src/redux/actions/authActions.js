import { REGISTERED_USER, LOGGEDIN_USER } from '../types'
// import { getErrors, resetErrors } from './'

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
    // await dispatch(resetErrors())
    return dispatch(registeredUser(data))
  } catch (err) {
    // await dispatch(getErrors(err))
    throw err.response.data
  }
}

const LoggedinUser = userData => ({
  type: LOGGEDIN_USER,
  payload: userData,
})

export const loginUser = userData => async (dispatch, getState, { axios }) => {
  try {
    const {
      data: { token },
    } = await axios.post('/api/users/login', userData)
    localStorage.setItem('jwtToken', token)
    // setAuthToken(token)
    // return dispatch(LoggedinUser(data))
  } catch (err) {
    throw err.response.data
  }
}
