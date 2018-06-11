import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Pagination extends Component {
	render() {
		return (
			<nav className="pt-4">
				<ul className="pagination justify-content-end">
					<li className={(this.props.currentPage === 1) ? 'page-item disabled' : 'page-item'} onClick={this.props.onPrev}>
						<a className="page-link" href="#" tabIndex="-1">Previous</a>
					</li>
					{
						this.props.pageNumbers.map(number => (
							<li key={number} data-value={number} onClick={this.props.onClick} className={(this.props.currentPage === number) ? 'page-item active' : 'page-item' } ><a className="page-link" href="#">{number}</a></li>
						))
					}
					<li className="page-item">
						<a className="page-link" href="#">Next</a>
					</li>
				</ul>
			</nav>
		);
	}
}

Pagination.propTypes = {
	onClick: PropTypes.func,
	currentPage: PropTypes.number,
	pageNumbers: PropTypes.array,
	onPrev: PropTypes.func
};

export default Pagination;
