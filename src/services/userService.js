import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = `${apiUrl}/users`;

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

export function getUser() {
	return http.get(`${apiEndpoint}/me`);
}
