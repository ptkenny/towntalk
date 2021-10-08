import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { collection, query, onSnapshot, getFirestore } from 'firebase/firestore';
import firebaseUtils from '../utils/firebase_utils';

function PostDetails(props) {
	return (
		<Card body>
			<Link to={`/posts/${props.id}`}>{props.title}</Link> - {props.author}
		</Card>
	);
}

export default function RecentPosts(props) {
	let [posts, setPosts] = React.useState([]);

	React.useEffect(() => {
		async function updatePosts() {
			const q = query(collection(getFirestore(), await firebaseUtils.getUserZipCode()));
			onSnapshot(q, (snapshot) => {
				setPosts(
					snapshot.docs.map((doc) => (
						<PostDetails
							key={doc.data().timestamp}
							title={doc.data().title}
							author={doc.data().authorUsername}
							id={doc.id}
						/>
					))
				);
			});
		}

		updatePosts();
	});

	return <div>{posts}</div>;
}
