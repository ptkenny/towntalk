import React from 'react';
import { Navbar, Nav, Container, Row } from 'react-bootstrap';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import { Link } from 'react-router-dom';

export default function NavigationBar(props) {
	let [user, setUser] = React.useState(null);

	onAuthStateChanged(getAuth(), (user) => {
		setUser(user);
	});

	let logOut = () => {
		signOut(getAuth());
	};

	return (
		<Container fluid style={{ textAlign: 'center' }}>
			<h1>TownTalk</h1>
			<Link to="/">Home</Link>•<Link to="/login">Login</Link>•<Link to="/register">Register</Link>•
			{user && <Link onClick={logOut}>Logout</Link>}
		</Container>
	);

	return (
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand className="mx-3" href="/">
				TownTalk
			</Navbar.Brand>
			<Nav className="me-auto">
				<Nav.Link href="/login">Login</Nav.Link>
				<Nav.Link href="/register">Register</Nav.Link>
			</Nav>
			<Nav>{user && <Nav.Link onClick={logOut}>Logout</Nav.Link>}</Nav>
		</Navbar>
	);
}
