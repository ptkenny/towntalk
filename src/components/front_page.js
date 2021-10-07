import React from 'react';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { Form, Collapse, Container, Col } from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';

export default function FrontPage(props) {
	let [user, setUser] = React.useState(null);
	let [open, setOpen] = React.useState(false);

	onAuthStateChanged(getAuth(), (user) => {
		setUser(user);
	});

	let toggleOpen = () => {
		setOpen(!open);
	};

	return (
		<>
			<h1>This is the front page!</h1>
			<Container>
				<Col md={{ span: 6, offset: 3 }}>
					<Button variant="primary" onClick={toggleOpen}>
						Make a Post!
					</Button>
					<Collapse in={open}>
						<Form>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Post Title</Form.Label>
								<Form.Control type="text" />
							</Form.Group>
							<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
								<Form.Label>Post Details</Form.Label>
								<Form.Control as="textarea" rows={3} />
							</Form.Group>
						</Form>
					</Collapse>
				</Col>
			</Container>
		</>
	);
}
