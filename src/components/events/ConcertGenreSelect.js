import React from 'react';
import PropTypes from 'prop-types';

const ConcertGenreSelect = (props) => {
	return (
		<select onChange={props.onChange} className="custom-select form-control-md">
			<option value="">Select genre</option>
			{
				props.genres.map((genre, i) => <option key={i} value={genre}>{genre}</option>)
			}
		</select>
	);
};

ConcertGenreSelect.propTypes = {
	onChange: PropTypes.func,
	genres: PropTypes.array
};
export default ConcertGenreSelect;
