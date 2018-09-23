import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = ({
	currentPage,
	eventsCount,
	eventsPerPage,
	onClick,
	onPrev,
	onNext
}) => {
	const pagesCount = Math.ceil(eventsCount / eventsPerPage);
	if (pagesCount <= 1) return null;
	const pageNumbers = _.range(1, pagesCount + 1);
	return (
		<nav className="pt-4">
			<ul className="pagination justify-content-end">
				<li
					className={currentPage === 1 ? 'page-item disabled' : 'page-item'}
					onClick={onPrev}
				>
					<a className="page-link" href="#" tabIndex="-1">
						Previous
					</a>
				</li>
				{pageNumbers.map(number => (
					<li
						key={number}
						data-value={number}
						onClick={onClick}
						className={
							currentPage === number ? 'page-item active' : 'page-item'
						}
					>
						<a className="page-link" href="#">
							{number}
						</a>
					</li>
				))}
				<li
					className={
						currentPage === pagesCount ? 'page-item disabled' : 'page-item'
					}
					onClick={() => onNext(pagesCount)}
				>
					<a className="page-link" href="#">
						Next
					</a>
				</li>
			</ul>
		</nav>
	);
};

Pagination.propTypes = {
	onClick: PropTypes.func,
	currentPage: PropTypes.number,
	eventsPerPage: PropTypes.number,
	eventsCount: PropTypes.number,
	onPrev: PropTypes.func,
	onNext: PropTypes.func
};

export default Pagination;
