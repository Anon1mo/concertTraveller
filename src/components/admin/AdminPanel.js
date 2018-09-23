import React, { Component } from 'react';
import EventsTable from '../events/EventsTable';
import { Link } from 'react-router-dom';
import UsersTable from '../users/UsersTable';

class AdminPanel extends Component {
	constructor() {
		super();
		this.state = {
			data: []
		};
	}
	render() {
		return (
			<div>
				<h1 className="text-center">Admin Panel</h1>
				<div className="accordion" id="accordionAdmin">
					<div className="card">
						<div className="card-header" id="headingOne">
							<h5 className="mb-0">
								<button
									className="btn btn-link"
									type="button"
									data-toggle="collapse"
									data-target="#collapseOne"
									aria-expanded="true"
									aria-controls="collapseOne"
								>
									Events Management
								</button>
							</h5>
						</div>

						<div
							id="collapseOne"
							className="collapse show"
							aria-labelledby="headingOne"
							data-parent="#accordionAdmin"
						>
							<div className="card-body">
								<div className="text-center pb-4">
									<Link to={'/events/addEvent/new'}>
										<button className="btn btn-primary btn-lg">
											Add Event
										</button>
									</Link>
								</div>
								<EventsTable />
							</div>
						</div>
					</div>
					<div className="card">
						<div className="card-header" id="headingTwo">
							<h5 className="mb-0">
								<button
									className="btn btn-link collapsed"
									type="button"
									data-toggle="collapse"
									data-target="#collapseTwo"
									aria-expanded="false"
									aria-controls="collapseTwo"
								>
									List of users
								</button>
							</h5>
						</div>
						<div
							id="collapseTwo"
							className="collapse"
							aria-labelledby="headingTwo"
							data-parent="#accordionAdmin"
						>
							<div className="card-body">
								<UsersTable />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AdminPanel.propTypes = {};

export default AdminPanel;
