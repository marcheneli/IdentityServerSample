import axios from 'axios';
import querystring from 'querystring';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:61684';
const PROTECTED_API_URL = 'http://localhost:59994'

export function signinUser({ email, password }){
    return function(dispatch){
        axios.post(`${ROOT_URL}/connect/token`,
            querystring.stringify({
                client_id: 'socialnetwork',
                client_secret: 'secret',
                grant_type: 'password',
                scope: 'openid',
                username: email,
                password: password
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}
        ).then(response => {
            dispatch({ type: AUTH_USER });
            console.log(response);
            localStorage.setItem('token', response.data.access_token);

            browserHistory.push('/feature');
        }).catch(() => {
            dispatch(authError("Bad login info"))
        });
    }
}

export function signoutUser(){
    localStorage.removeItem('token');

    return { type: UNAUTH_USER }
}

export function signupUser({ email, password}) {
    return function(dispatch){
        axios.post(`${ROOT_URL}/`, { email, password })
        .then(response => {
            dispatch({type: AUTH_USER});

            localStorage.setItem('token', response.data.access_token);

            browserHistory.push('/feature');
        })
        .catch(response => dispatch(authError(response.data.error)));
    };
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function fetchMessage() {
    return function(dispatch){
        axios.get(`${PROTECTED_API_URL}/api/protected`,{ 
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
            console.log(response);
            dispatch({
                type: FETCH_MESSAGE,
                payload: response.data
            });
        })
        .catch(response => {
            console.log(response);
        });
    }
}