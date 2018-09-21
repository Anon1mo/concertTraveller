import React, { Component } from 'react';
import PropTypes from 'prop-types';
import auth from '../../services/authService';
import { sendMessage } from '../../services/offerService';

class Chat extends Component {
	constructor() {
		super();
		this.state = {
			data: {
				chat: []
			},
			message: ''
		};

		this.onSend = this.onSend.bind(this);
	}

	componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState({ user });
		this.setState({
			data: {
				chat: this.props.messages
			}
		});

		console.log(this.props.offerId);
	}

	onChange = ({ currentTarget }) => {
		this.setState({ message: currentTarget.value });
	};

	async onSend() {
		let { chat } = this.state.data;
		const message = {
			username: this.state.user.username,
			message: this.state.message
		};

		try {
			chat.push(message);
			this.setState({ chat });
			await sendMessage(this.props.offerId, message);
		} catch (ex) {
			this.setState({ chat });
			console.log(ex);
		}
	}

	render() {
		const {
			message,
			data: { chat }
		} = this.state;
		return (
			<ul className="list-group">
				<li className="list-group-item list-group-item-dark">Chat</li>
				<li className="list-group-item h-50">
					{chat &&
						chat.map((message, id) => {
							let style = 'col-md-2';
							style +=
								this.state.user.username === message.username ? ' ml-auto' : '';

							return (
								<div className="row mb-2" key={id}>
									<div className={style}>{message.username}</div>
									<div className="col-md-5 bg-secondary text-white rounded">
										{message.message}
									</div>
								</div>
							);
						})}
				</li>
				<li className="list-group-item p-0">
					<div className="input-group rounded-0">
						<input
							value={message}
							onChange={this.onChange}
							type="text"
							className="form-control"
							placeholder="Write a message"
						/>
						<div className="input-group-append">
							<button
								onClick={this.onSend}
								type="button"
								className="btn btn-success"
							>
								Send
							</button>
						</div>
					</div>
				</li>
			</ul>
		);
	}
}

Chat.propTypes = {
	messages: PropTypes.array,
	offerId: PropTypes.string.isRequired
};

export default Chat;
