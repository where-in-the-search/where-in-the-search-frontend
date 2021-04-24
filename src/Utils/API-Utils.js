// i'd prefer non-component file names to be in kabob-case, to clarify intent

import request from 'superagent';

const URL = 'https://else-by-elsewhere.herokuapp.com'; 
// const URL = 'http://localhost:3000'; 

// a lot of these functions could be made leaner by calling this function, which would reduce duplication
// async function makeRequest(url, param, token) {
//     const response = await request
//         .get(`${URL}${url}${param}`)
//         .set('Authorization', token);
//     return response.body;
// }

// export async function deleteThing(thingId, token) {
//     return await makeRequest('/api/thing/', thingId, token);
// }

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
