import Config from '../config';
import {authHeader} from '../common/AuthHeader';
import axios from 'axios';

export const userService = {
    isAuthenticated,
    getUserInfo,
    login,
    register,
    logout,
    changePassword
};

function isAuthenticated() {
    let user = JSON.parse(localStorage.getItem('user'));
    return !!(user && user.token);
}

function getUserInfo(){
    return localStorage.getItem('user');
}

function login(username, password) {
    const requestOptions = {
        body: {
            username: username,
            password: password
        }
    };

    return axios.post(Config.apiUrl + '/user/authenticate', requestOptions.body)
        .catch(response => {
            return Promise.reject(response.response);
        })
        .then(user => {
            if (user && user.data && user.data.token) {
                localStorage.setItem('user', JSON.stringify(user.data));
            }

            return user;
        })
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    return fetch(`${Config.apiUrl}/user/register`, requestOptions).then(handleResponse);
}

function changePassword(user) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    return axios.put(Config.apiUrl + '/user/changePassword', requestOptions)
        .then(handleResponse);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || (data && data.error) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
