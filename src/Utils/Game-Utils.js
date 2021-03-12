import { getLocationById } from './API-Utils.js';

export function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

export function generateMapCoordinates() {
    const latOne = getRandomInRange(-90, 90, 4);
    const lonOne = getRandomInRange(-180, 180, 4);
    return { mapLat: latOne, mapLon: lonOne }
}

export function getRandomIdOrder() {
    let sessionLocations = [];
	while (sessionLocations.length < 5) {
		let randomNumber = Math.ceil(Math.random() * 85);
		// use a set? guarantees nonduplication - then make it an array
        if (!sessionLocations.some(n => n === randomNumber)) {
			sessionLocations.push(randomNumber);
		}
	}
	return sessionLocations;
}

export async function getNewLocation(index) {
    //looks at locations array of ids that are in state, grabs the next in line, adnd returns the location from the locations table
    const sessionLocations = getRandomIdOrder();

    const locationObject = await getLocationById(sessionLocations[index])
    console.log(locationObject);
    return locationObject;
}

export function checkGuess(guess, locationObj) {
    //array of regex patterns or strings to match city/region/country
    const {
        region,
        city,
        country
    } = locationObj;

    const upperCaseGuess = guess.toUpperCase();
    const upperCaseRegion = region.toUpperCase();
    const upperCaseCity = city.toUpperCase();
    const upperCaseCountry = country.toUpperCase();

    if (upperCaseGuess === upperCaseCity || upperCaseGuess === upperCaseRegion || upperCaseGuess === upperCaseCountry) return true;
    
    else if (upperCaseGuess.includes(upperCaseCity) || upperCaseGuess.includes(upperCaseRegion) || upperCaseGuess.includes(upperCaseCountry)) return true;

    else if (upperCaseGuess.length >= 3) {
        if (upperCaseCity.includes(upperCaseGuess) || upperCaseRegion.includes(upperCaseGuess) || upperCaseCountry.includes(upperCaseGuess)) return true;
    } 
    
    else return false;
}

//
// {
//     country: 'USA',
//     region: 'Oregon',
//     city: 'Portland',
//     longitude: '-134.5689',
//     latitude: '43.6589',
//     currency_symbol: '$',
//     sunrise: '7:04AM',
//     sunset: '6:40PM',
//     time_zone: '+02:00',
//     hints: [
//       'thyt',
//       'gryt'
//     ],
//     image_url: 'nothing.com'
//   }