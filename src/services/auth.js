import { notification } from 'antd'
import {config} from '../config'
import {request} from './apiRequest'

export const authService = {
  login,
  currentAccount,
  logout,
  signUp,
  sendToken,
  confirmToken,
  requestPasswordResetLink,
  confirmPasswordResetToken,
  resetPassword
}

async function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };
  return fetch(`${config.apiUrl}/auth/signin`, requestOptions).then(request.handleResponse)
    .then(auth => {
      console.log(auth)
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('auth', JSON.stringify(auth));
    })
    .then(() => true)
    .catch(error => {
      notification.warning({
        message: error.code,
        description: error.message,
      })
    })
}

async function currentAccount() {
  return request.get('/users/me');
}

async function logout() {
  localStorage.removeItem('auth');
  return true;
}

function signUp(user){
  return request.post('/auth/signup', user);
}

function sendToken(user){
  return request.post(`/auth/sendRegistrationToken/${user.id}` , user);
}

function confirmToken(token){
  return request.post(`/auth/confirm?token=${token}`);
}

function requestPasswordResetLink(email){
  return request.post(`/auth/requestPasswordResetLink?email=${email}`);
}

function confirmPasswordResetToken(token){
  return request.post(`/auth/passwordResetToken?token=${token}`);
}

function resetPassword(user){
  return request.post(`/auth/resetPassword/user/${user.id}`, user);
}
