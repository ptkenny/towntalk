import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';

export default function NavigationBar(props) {
	let [user, setUser] = React.useState(null);

	onAuthStateChanged(getAuth(), (user) => {
		setUser(user);
	});

	let logOut = () => {
		signOut(getAuth());
	};

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
