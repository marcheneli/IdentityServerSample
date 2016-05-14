import axios from 'axios';
import querystring from 'querystring';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER } from './types';

const ROOT_URL = 'http://localhost:61684';

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
            
        });


    }
}