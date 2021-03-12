import request from 'superagent';

const URL = 'https://else-by-elsewhere.herokuapp.com';
// const URL = 'http://localhost:3000';


async function getUserAuth(email, password, authRoute) {
	const response = await request.post(`${URL}/${authRoute}`)
			.send({ email, password });

		return response.body;
}

export async function loginOrSignup(email, password) {
	let response = {};
	try {
		response = await getUserAuth(email, password, 'auth/signin');
	}
	catch(e) {
		response = await getUserAuth(email, password, 'auth/signup');
	}
	return response;
}
