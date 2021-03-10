import request from "superagent";

export function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

export function generateMapCoordinates() {
    const latOne = getRandomInRange(-90, 90, 4);
    const lonOne = getRandomInRange(-180, 180, 4);
    return { mapLat: latOne, mapLon: lonOne }
}

export function getRandomIdOrder() {
    let sessionCoordinates = [];
	while (sessionCoordinates.length < 5) {
		let randomNumber = Math.ceil(Math.random() * 83);
		if (!sessionCoordinates.some(n => n === randomNumber)) {
			sessionCoordinates.push(randomNumber);
		}
	}
	return sessionCoordinates;

}

export async function getSessionCoordinates() {
    // console.log('GET COORDINATES CALLED');
	const coordinateIDs = getRandomIdOrder();
	let coordinatesArray = [];
	for (let i of coordinateIDs) {
		const newCoordinates = await request.get(`https://whispering-inlet-91926.herokuapp.com/coordinates/${i}`);
		const { lat, lon } = newCoordinates.body;

        coordinatesArray.push({ mapLat: lat, mapLon: lon });
	}
    // console.log('COORDINATES ARRAY', coordinatesArray);
	return coordinatesArray;
}

function generateMapURL(lat, lon) {
    return `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${lat},${lon}&fov=80&heading=70&pitch=0&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
}

// function truncateCoordinates(coordObj) {
//     const { mapLat, mapLon } = coordObj;
//     console.log('MAPLAT', mapLat, 'MAPLON', mapLon);
//     const shortLat = Number(mapLat).toFixed(4);
//     const shortLon = Number(mapLon).toFixed(4);
//     return { mapLat: shortLat, mapLon: shortLon }
// }

export async function getNewLocation() {
    const mapCoord = await getSessionCoordinates();
    
    const response = await request.get(`https://whispering-inlet-91926.herokuapp.com/geo-data-location/${mapCoord[0].mapLat}&${mapCoord[0].mapLon}`);
        
    //we need to determine whether *any* property's value in the response is 'null'
    //if anything is null: we call getNewLocation() again to get a new response
    for (let property in response.body) {
        console.log('BROOOOO', response.body[property])
        if (response.body[property] === 'null') {
            console.log('yoooooooooo' ,response.body[property])
            getNewLocation();
        }
    }

    //if nothing is null: continue as below with munging into the location object

    const { country, region, city, latitude, longitude, currency_symbol, sunrise, sunset, time_zone } = response.body;

    return {
        country,
        region,
        city,
        latitude,
        longitude,
        currency_symbol,
        sunrise,
        sunset,
        time_zone,
        hints: ['thyt', 'gryt'],
        image_url: generateMapURL(mapCoord[0].mapLat, mapCoord[0].mapLon)
    }
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