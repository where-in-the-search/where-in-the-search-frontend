// i'd prefer non-component file names to be in kabob-case, to clarify intent
import { getLocationById } from './API-Utils.js';

export function getRandomIdOrder() {
    let sessionLocations = [];
    while (sessionLocations.length < 5) {
        let randomNumber = Math.ceil(Math.random() * 85);

        if (!sessionLocations.some(n => n === randomNumber)) {
            sessionLocations.push(randomNumber);
        }
    }
    return sessionLocations;
}

export async function getNewLocation(index) {
    //looks at an array representing random IDs, grabs the next in line based on an index from state, and returns the location from the locations table
    const sessionLocations = getRandomIdOrder();

    const locationObject = await getLocationById(sessionLocations[index]);

    return locationObject;
}

export function checkGuess(guess, locationObj) {
    const {
        region,
        city,
        country
    } = locationObj;

    const upperCaseGuess = guess.toUpperCase();
    const upperCaseRegion = region.toUpperCase();
    const upperCaseCity = city.toUpperCase();
    const upperCaseCountry = country.toUpperCase();

    // series of conditionals to broadly check the guess against the location data
    if (upperCaseGuess === upperCaseCity || 
        upperCaseGuess === upperCaseRegion || 
        upperCaseGuess === upperCaseCountry) 
        return true;
    
    else if (upperCaseGuess.includes(upperCaseCity) || 
            upperCaseGuess.includes(upperCaseRegion) || 
            upperCaseGuess.includes(upperCaseCountry)) 
            return true;

    else if (upperCaseGuess.length >= 3) {
        if (upperCaseCity.includes(upperCaseGuess) || 
            upperCaseRegion.includes(upperCaseGuess) || 
            upperCaseCountry.includes(upperCaseGuess)) 
            return true;
    } 
    
    return false;
}

export function changeImageURL(image_url, newFov, newHeading) {
    // woaah. some serious munging happening here! nice job plodding through the thick of it!
    const fov = image_url.slice(image_url.indexOf('fov='), image_url.indexOf('&heading'));
    const heading = image_url.slice(image_url.indexOf('heading='), image_url.indexOf('&pitch'));

    const splitFov = fov.split('=');
    const updatedFov = splitFov[0] + '=' + newFov;

    const splitHeading = heading.split('=');
    const updatedHeading = splitHeading[0] + '=' + newHeading;

    const newURLFov = image_url.replace(fov, updatedFov);
    const newURLFovAndHeading = newURLFov.replace(heading, updatedHeading);

    return newURLFovAndHeading;
}

const GOOGLE_URL = 'https://maps.googleapis.com/maps/api/streetview?size=400x400&location';

export function changeMapZoom(fov, lat, lon) {
    const newImage = `${GOOGLE_URL}=${lat},${lon}&fov=${fov}&heading=70&pitch=0&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
    return newImage;
}

export function changeMapAngle(heading, lat, lon) {
    const newImage = `${GOOGLE_URL}=${lat},${lon}&fov=80&heading=${heading}&pitch=0&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
    return newImage;
}
