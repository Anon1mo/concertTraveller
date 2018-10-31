import http from './httpService';

const apiEndpoint = '/users';

function userUrl(id) {
	return `${apiEndpoint}/${id}`;
}

export function register(user) {
	return http.post(apiEndpoint, {
		username: user.username,
		email: user.email,
		password: user.password,
		age: user.age
	});
}

export function getUsers() {
	return http.get(apiEndpoint);
}

export function getMe() {
	return http.get(`${apiEndpoint}/me`);
}

export function getUser(userId) {
	return http.get(userUrl(userId));
}
