const USER = 'USER';
const SESSION = 'SESSION';


export function getUserFromLocalStorage() {
    const user = localStorage.getItem(USER);
    try {
        return JSON.parse(user);

    } catch(e) {
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

    } catch(e) {
        return {
            name: '',
            character: ''
        }
    }
}