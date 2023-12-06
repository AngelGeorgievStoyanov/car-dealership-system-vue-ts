import {API_URL} from '../utils/baseUrl'


export async function regisrer(user) {


    const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (response.status >= 400) {
        const result = await response.json();
        throw new Error(result);
    }

    return response.json()
}


export async function login(email, password) {


    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (response.status >= 400) {
        const result = await response.json();
        throw new Error(result);
    }


    return response.json()
}