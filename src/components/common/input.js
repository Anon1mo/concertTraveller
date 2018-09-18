import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ name, label, error, ...rest }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input {...rest} name={name} id={name} className="form-control" />
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

Input.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	error: PropTypes.string,
	rest: PropTypes.object
};

export default Input;
