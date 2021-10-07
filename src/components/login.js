import React from 'react';
import { Stack, Form, Button } from 'react-bootstrap';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loggedIn: false };
		this.email = React.createRef();
		this.password = React.createRef();
	}

	componentDidMount() {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				this.setState({ loggedIn: true });
			}
		});
	}

	signIn(e) {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, this.email.current.value, this.password.current.value).catch((error) => {
			console.log(error);
		});
	}

	render() {
		return this.state.loggedIn ? (
			<h1>You are already logged in.</h1>
		) : (
			<Stack className="mx-auto align-items-center">
				<Form onSubmit={this.signIn.bind(this)}>
					<Form.Group>
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" ref={this.email} placeholder="Enter email" />
					</Form.Group>

					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" ref={this.password} placeholder="Password" />
					</Form.Group>

					<Button variant="primary" type="submit" className="w-100 my-3">
						Sign In
					</Button>
				</Form>
			</Stack>
		);
	}
}
