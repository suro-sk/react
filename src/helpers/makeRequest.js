import {getToken} from "./authToken";

export default async function makeRequest(url, method = 'GET', body) {
    const token = await getToken();
    const params = {
        method: method,
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    }

    if (body) {
        params.body = JSON.stringify(body)
    }

    return fetch(url, params)
        .then(async (res) => {
            if (res.status >= 400 && res.status < 600) {
                if (res.error) {
                    throw res.error;
                } else {
                    throw new Error('Something went wrong')
                }
            }

            const data = await res.json()

            return data;
        });
}