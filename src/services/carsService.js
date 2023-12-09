import { API_URL } from '../utils/baseUrl'


export async function createCar(car) {


    const response = await fetch(`${API_URL}/cars/create`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(car)
    });

    if (response.status >= 400) {
        const result = await response.json();
        throw new Error(result);
    }

    return response.json()
}


export async function getAllCars() {
    const response = await fetch(`${API_URL}/cars/`)
    if (response.status >= 400) {
        const result = await response.json();
        throw new Error(result);
    }
    return response.json();
}