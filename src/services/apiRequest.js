import {config} from '../config';
import { authService } from './auth'

const token = {
  ACCESS_TOKEN : 'accessToken',
  TOKEN_TYPE : 'tokenType',
}

export const request = {
    get,
    post,
    put,
    del,
    postFile,
    handleResponse
};

export function authHeader() {
    // return authorization header with jwt token
    const auth = JSON.parse(localStorage.getItem('auth'));

    if (auth) {
      const space = " ";
        return {
                'Content-Type': 'application/json',
                'Authorization': auth[token.TOKEN_TYPE] + space + auth[token.ACCESS_TOKEN]
              };
    }
    return {'Content-Type': 'application/json'};
}

export function authFileHeader() {
    // return authorization header with jwt token
    const auth = JSON.parse(localStorage.getItem('auth'));
    const space = " ";
    if (auth) return { 'Authorization': auth[token.TOKEN_TYPE] + space + auth[token.ACCESS_TOKEN]};
    return {};
}

function get(url, body) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
        body: JSON.stringify(body)
    };
    return req(config.apiUrl + url, requestOptions);
}

function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body)
    };
    return req(config.apiUrl + url, requestOptions);
}

function postFile(url, file) {
    const formData = new FormData()
    formData.append('file', file)

    const requestOptions = {
        method: 'POST',
        headers: authFileHeader(),
        body: formData
    };
    return req(config.apiUrl + url, requestOptions);
}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(body)
    };
    return req(config.apiUrl + url, requestOptions);
}

function del(url, body) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
        body: JSON.stringify(body)
    };
    return req(config.apiUrl + url, requestOptions);
}

function req(url, options) {
    return fetch(url, options).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                authService.logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
