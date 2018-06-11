import React from 'react';
import PropTypes from 'prop-types';

const ConcertSearchbar = (props) => {
	return (
		<div className="input-group">
			<input className="form-control border-right-0 border" onChange={props.onChange} type="search" placeholder="search" id="concert-searchbar" />
			<span className="input-group-append">
				<div className="input-group-text bg-transparent"><i className="fa fa-search"></i></div>
			</span>
		</div>
	);
};

ConcertSearchbar.propTypes = {
	onChange: PropTypes.func
};
export default ConcertSearchbar;
