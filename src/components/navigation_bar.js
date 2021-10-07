import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export default function NavigationBar(props) {
	return (
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand className="mx-3" href="/">
				TownTalk
			</Navbar.Brand>
			<Nav className="me-auto">
				<Nav.Link href="/login">Login</Nav.Link>
				<Nav.Link href="/register">Register</Nav.Link>
			</Nav>
		</Navbar>
	);
}
