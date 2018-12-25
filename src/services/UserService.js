import {authHeader} from '../common/AuthHeader';
import axios from 'axios';
import ApiCalls from "../ApiCalls";

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

function getUserInfo() {
    return localStorage.getItem('user');
}

function login(username, password) {
    const requestOptions = {
        body: {
            username: username,
            password: password
        }
    };

    return axios.post(ApiCalls.getUserUrl() + '/authenticate', requestOptions.body)
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
    return axios.post(ApiCalls.getUserUrl() + '/register', user, {
        headers: {'Content-Type': 'application/json'}
    }).catch(response => {
        return Promise.reject(response.response);
    })
}

function changePassword(user) {
    let headers = authHeader();
    headers['Content-Type'] = 'application/json';

    return axios.put(ApiCalls.getUserUrl() + '/changePassword',
        JSON.stringify(user), {
            headers: headers
        }).catch(response => {
        return Promise.reject(response.response);
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
