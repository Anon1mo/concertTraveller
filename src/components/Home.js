import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
	<main role="main">
		<div className="jumbotron">
			<div className="container">
				<h1 className="display-3">Welcome to Concert Traveller</h1>
				<p>
					This is a test application used in a master&#39;s thesis. By using it
					you can find new companions to go to events to or look for a ride with
					fellow travellers
				</p>
				<p>
					<Link to="/events">
						<button className="btn btn-primary btn-lg" href="#" role="button">
							Find more and try it &raquo;
						</button>
					</Link>
				</p>
			</div>
		</div>

		<div className="container" />
	</main>
);

export default Home;
