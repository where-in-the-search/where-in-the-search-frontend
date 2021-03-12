import { getLocationById } from './API-Utils.js';

// pretty sure we're no longer using these, but commenting out pending testing in case I've overlooked something
// export function getRandomInRange(from, to, fixed) {
//     return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
// }

// export function generateMapCoordinates() {
//     const latOne = getRandomInRange(-90, 90, 4);
//     const lonOne = getRandomInRange(-180, 180, 4);
//     return { mapLat: latOne, mapLon: lonOne }
// }

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
    
    else return false;
}
