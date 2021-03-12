import request from 'superagent';

const URL = 'https://else-by-elsewhere.herokuapp.com'; 
            // 'http://localhost:3000'; 

export async function postLocationGuesses(guesses, token) {
    const response = await request
        .post(`${URL}/api/location_guesses`)
        .set('Authorization', token)
        .send(guesses)

    return response.body;
}

export async function postLocation(location) {
    const response = await request
        .post(`${URL}/locations`)
        .send(location)

    return response.body;
}

export async function getLocationById(id) {
    const response = await request
        .get(`${URL}/locations/${id}`)

    return response.body;
}

export async function postSession(session, token) {
    const response = await request
        .post(`${URL}/api/sessions`)
        .set('Authorization', token)
        .send(session)

    return response.body;
}
