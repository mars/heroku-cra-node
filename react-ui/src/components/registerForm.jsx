import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export class RegisterForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			phone: '',
			need: '',
			location: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	async handleSubmit(event) {
		event.preventDefault();
		const response = await axios.post(
			'/api/register',
			{ body: event.state },
			{ headers: { 'Content-Type': 'application/json' } }
		)
		console.log(response);
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Telefoni number:
          			<input type="text" name="phone" value={this.state.phone} onChange={this.handleChange} />
				</label>
				<label>
					Abivajadus:
          			<input type="textarea" name="need" value={this.state.need} onChange={this.handleChange} />
				</label>
				<label>
					Minu asukoht:
          			<input type="textarea" name="location" value={this.state.location} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Saada" />
			</form>
		);
	}
}