import jwtDecode from "jwt-decode";
import {store} from "../components/store/store";
import {LOGOUT} from "../components/store/actionTypes";
import {history} from "../history";


export const requestNoToken = (url, method = 'GET', body) => {
    const config = {
        method: method,
        headers: {
            "Content-Type": 'application/json',
        }
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    return fetch(url, config)
        .then(async (response) => {
            const res = await response.json();

            if (response.status >= 400 && response.status < 600) {
                if (res.error) {
                    throw res.error;
                } else {
                    throw new Error('Something went wrong!');
                }
            }

            return res;
        });
}

export function isUserLoggedIn() {
    return !!localStorage.getItem('tokens')
}

export function getToken() {
    const token = localStorage.getItem('tokens');
    if (token) {
        const tokensObj = JSON.parse(token);
        const jwtObj = jwtDecode(tokensObj.jwt);
        if (jwtObj.exp - new Date().getTime() / 1000 > 60) {
            return Promise.resolve(tokensObj.jwt);
        } else {
            /**
             * Update JWT with Refresh token
             */
            const apiHost = process.env.REACT_APP_API_HOST;

            return requestNoToken(`${apiHost}/user/${jwtObj.userId}/token`, 'PUT', {
                refreshToken: tokensObj.refreshToken
            })
                .then(token => {
                    saveToken(token);
                    return token.jwt;
                })
                .catch(() => {
                    // logOut();
                });
        }
    }

//else logout
}

export function saveToken(token) {
    localStorage.setItem('tokens', JSON.stringify(token));
}

export function logOut() {
    localStorage.removeItem('tokens')
    store.dispatch({type: LOGOUT})
    history.push('/sign-in')
}