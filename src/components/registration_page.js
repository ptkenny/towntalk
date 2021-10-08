import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

export default class RegistrationPage extends React.Component {
	constructor(props) {
		super(props);
		this.username = React.createRef();
		this.email = React.createRef();
		this.password = React.createRef();
		this.zipCode = React.createRef();
	}

	registerUser(e) {
		e.preventDefault();
		let username = this.username.current.value;
		let email = this.email.current.value;
		let password = this.password.current.value;
		let zipCode = this.zipCode.current.value;
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then((credential) => {
				const user = credential.user;
				updateProfile(user, {
					displayName: username,
				}).catch((error) => {
					console.log(error);
				});
				setDoc(doc(getFirestore(), 'users', user.uid), {
					zipCode: zipCode,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}
	render() {
		return (
			<Container>
				<Row>
					<Col md={{ span: 4, offset: 4 }}>
						<Form onSubmit={this.registerUser.bind(this)} className="my-5">
							<Form.Group>
								<Form.Control type="text" ref={this.username} placeholder="Username" />
							</Form.Group>

							<Form.Group>
								<Form.Control type="email" ref={this.email} placeholder="Email" />
							</Form.Group>

							<Form.Group>
								<Form.Control type="password" ref={this.password} placeholder="Password" />
							</Form.Group>

							<Form.Group>
								<Form.Control type="text" ref={this.zipCode} placeholder="Zip Code" />
							</Form.Group>

							<Button variant="primary" type="submit" className="w-100 my-3">
								Register
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		);
	}
}
