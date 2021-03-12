const USER = 'USER';
const SESSION = 'SESSION';
const LOCATIONS = 'LOCATIONS';

const emptyLocationArray = [];
const emptySessionObj = {
    name: '',
    character_id: '',
    date: '', 
    profession: ''
}

export function getUserFromLocalStorage() {
    const user = localStorage.getItem(USER);
    try {
        return JSON.parse(user);

    } catch (e) {
        return {
            email: '',
            id: '',
            token: ''
        }
    }
}

export function putUserInLocalStorage(user) {
    localStorage.setItem(USER, JSON.stringify(user));
}

export function storeSessionInfo(session) {
    localStorage.setItem(SESSION, JSON.stringify(session));
}

export function getSessionInfo() {
    const session = localStorage.getItem(SESSION);
    try {
        return JSON.parse(session);

    } catch (e) {
        return emptySessionObj;
    }
}

export function getLocationsFromLocalStorage() {
    const locations = localStorage.getItem(LOCATIONS);

    if (locations) {
        const parsedLocation = JSON.parse(locations);

        return parsedLocation;
    } else {

        localStorage.setItem(LOCATIONS, JSON.stringify(emptyLocationArray));

        return emptyLocationArray;
    }
}

export function putLocationInLocalStorage(location) {
    const locationArray = getLocationsFromLocalStorage();
    locationArray.push(location);
    localStorage.setItem(LOCATIONS, JSON.stringify(locationArray));
}

export function clearSession() {

    localStorage.setItem(SESSION, JSON.stringify(emptySessionObj));

    const locationArray = getLocationsFromLocalStorage();
    while (locationArray.length > 0) {
        locationArray.pop()
    };

    localStorage.setItem(LOCATIONS, JSON.stringify(locationArray));
}
