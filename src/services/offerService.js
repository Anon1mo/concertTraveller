import http from './httpService';

const apiEndpoint = '/offers';

function offerUrl(id) {
	return `${apiEndpoint}/${id}`;
}

export function getOffers() {
	return http.get(apiEndpoint);
}

export function getUserOffers(userId) {
	const queryParameter = 'userId';
	return http.get(`${apiEndpoint}?${queryParameter}=${userId}`);
}

export function getEventOffers(eventId) {
	const queryParameter = 'eventId';
	return http.get(`${apiEndpoint}?${queryParameter}=${eventId}`);
}

export function getOwnerOffers(ownerId) {
	const queryParameter = 'ownerId';
	return http.get(`${apiEndpoint}?${queryParameter}=${ownerId}`);
}

export function getOffer(offerId) {
	return http.get(offerUrl(offerId));
}

export function saveOffer(offer) {
	if (offer._id) {
		const body = { ...offer };
		delete body._id;
		return http.put(offerUrl(offer._id), body);
	}
	return http.post(apiEndpoint, offer);
}

export function deleteOffer(offerId) {
	return http.delete(offerUrl(offerId));
}

export function joinOffer(offerId) {
	return http.put(`${offerUrl(offerId)}/join`);
}

export function leaveOffer(offerId) {
	return http.put(`${offerUrl(offerId)}/leave`);
}

export function sendMessage(offerId, message) {
	return http.post(`${offerUrl(offerId)}/message`, message);
}
