import request from 'superagent';

const URL = 'https://whispering-inlet-91926.herokuapp.com'; //'http://localhost:3000'; 

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