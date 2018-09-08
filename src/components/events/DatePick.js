import React from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class ExampleCustomInput extends React.Component {
	render() {
		return (
			<div className="input-group">
				<input
					className="form-control"
					onClick={this.props.onClick}
					value={this.props.value ? this.props.value : 'Select date'}
					readOnly
				/>
			</div>
		);
	}
}

ExampleCustomInput.propTypes = {
	onClick: PropTypes.func,
	value: PropTypes.string
};

class DatePick extends React.Component {
	state = {
		startDate: null
	};

	handleChange = date => {
		console.log(date);
		this.setState({
			startDate: date
		});
		date
			? this.props.onChangeParent(date.format('YYYY-MM-DD'))
			: this.props.onChangeParent('');
	};

	render() {
		return (
			<div className="col-md-3 ml-auto">
				<DatePicker
					customInput={<ExampleCustomInput />}
					selected={this.state.startDate}
					placeholderText="Click to select a date"
					minDate={moment()}
					onChange={this.handleChange}
					isClearable={true}
				/>
			</div>
		);
	}
}

DatePick.propTypes = {
	onChangeParent: PropTypes.func
};

export default DatePick;
