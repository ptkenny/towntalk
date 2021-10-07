import React from 'react';
import { Stack, Form, Button } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default class RegistrationPage extends React.Component {
	constructor(props) {
		super(props);
		this.username = React.createRef();
		this.email = React.createRef();
		this.password = React.createRef();
	}

	registerUser(e) {
		e.preventDefault();
		let username = this.username.current.value;
		let email = this.email.current.value;
		let password = this.password.current.value;
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then((credential) => {
				const user = credential.user;
				updateProfile(user, {
					displayName: username,
				}).catch((error) => {
					console.log(error);
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}
	render() {
		return (
			<Stack className="mx-auto align-items-center">
				<Form onSubmit={this.registerUser.bind(this)}>
					<Form.Group>
						<Form.Label>Username</Form.Label>
						<Form.Control type="text" ref={this.username} placeholder="Enter username" />
					</Form.Group>

					<Form.Group>
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" ref={this.email} placeholder="Enter email" />
					</Form.Group>

					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" ref={this.password} placeholder="Password" />
					</Form.Group>

					<Button variant="primary" type="submit" className="w-100 my-3">
						Register
					</Button>
				</Form>
			</Stack>
		);
	}
}
