const USER = 'USER';
const SESSION = 'SESSION';
const LOCATIONS = 'LOCATIONS';

const emptyLocationArray = [];

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
        return {
            name: '',
            character_id: '',
            date: '', 
            profession: ''
        }
    }
}

export function getLocationsFromLocalStorage() {
    const locations = localStorage.getItem(LOCATIONS);

    if (locations) {
        const parsedLocation = JSON.parse(locations);

        return parsedLocation;
    } else {
        const emptyLocationArrayString = JSON.stringify(emptyLocationArray);

        localStorage.setItem(LOCATIONS, emptyLocationArrayString);

        return emptyLocationArray;
    }
}

export function putLocationInLocalStorage(location) {
    const locationArray = getLocationsFromLocalStorage();
    locationArray.push(location);
    localStorage.setItem(LOCATIONS, JSON.stringify(locationArray));
}

export function clearSession() {
    const sessionObj = {
        name: '',
        character_id: '',
        date: '', 
        profession: ''
    }

    localStorage.setItem(SESSION, JSON.stringify(sessionObj));

    localStorage.setItem(LOCATIONS, JSON.stringify(emptyLocationArray));
}
