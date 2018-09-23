import moment from 'moment';

export function formatDateToString(data) {
	if (Array.isArray(data)) {
		return data.map(el => {
			el.date = moment(el.date).format('YYYY-MM-DD');
			return el;
		});
	} else {
		data.date = moment(data.date).format('YYYY-MM-DD');
		return data;
	}
}
