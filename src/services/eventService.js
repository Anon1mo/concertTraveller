import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = `${apiUrl}/events`;

function eventUrl(id) {
	return `${apiEndpoint}/${id}`;
}

export function getEvents() {
	return http.get(apiEndpoint);
}

export function getEvent(eventId) {
	return http.get(eventUrl(eventId));
}

export function saveEvent(event) {
	if (event._id) {
		const body = { ...event };
		delete body._id;
		return http.put(eventUrl(event._id), body);
	}

	return http.post(apiEndpoint, event);
}

export function deleteEvent(eventId) {
	return http.delete(eventUrl(eventId));
}
