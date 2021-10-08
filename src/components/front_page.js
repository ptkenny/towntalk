import React from 'react';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { Button, Collapse, Container } from 'react-bootstrap';

import PostCreator from './post_creator';
import RecentPosts from './recent_posts';

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
			<Container>
				{user && (
					<div>
						<Button className="w-100 my-2" variant="primary" onClick={toggleOpen}>
							Make a Post!
						</Button>
					</div>
				)}
				<Collapse in={open}>
					<div>
						<PostCreator />
					</div>
				</Collapse>
				{user && <RecentPosts />}
			</Container>
		</>
	);
}
