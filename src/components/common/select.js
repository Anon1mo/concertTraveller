import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ name, label, options, error, ...rest }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<select name={name} id={name} {...rest} className="form-control">
				<option value="" />
				{options.map(option => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

Select.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	options: PropTypes.array,
	error: PropTypes.string,
	rest: PropTypes.object
};

export default Select;
