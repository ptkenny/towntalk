import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
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
		e.preventDefault();
		const auth = getAuth();
		signInWithEmailAndPassword(auth, this.email.current.value, this.password.current.value).catch((error) => {
			console.log(error);
		});
	}

	render() {
		return this.state.loggedIn ? (
			<h1>You are already logged in.</h1>
		) : (
			<Container>
				<Row>
					<Col md={{ span: 4, offset: 4 }}>
						<Form onSubmit={this.signIn.bind(this)} className="my-5">
							<Form.Group>
								<Form.Control type="email" ref={this.email} placeholder="Enter email" />
							</Form.Group>

							<Form.Group>
								<Form.Control type="password" ref={this.password} placeholder="Password" />
							</Form.Group>

							<Button variant="primary" type="submit" className="w-100 my-3">
								Sign In
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		);
	}
}
