import React from 'react';
import { Container } from 'react-bootstrap';
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
			{user && (
				<Link to="/" onClick={logOut}>
					Logout
				</Link>
			)}
		</Container>
	);
}
