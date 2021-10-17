import React from 'react';
import { collection, query, onSnapshot, getFirestore, orderBy } from 'firebase/firestore';
import firebaseUtils from '../utils/firebase_utils';
import Post from './post';

export default function RecentPosts(props) {
	let [posts, setPosts] = React.useState([]);

	React.useEffect(() => {
		async function updatePosts() {
			const user = firebaseUtils.getLoggedInUser();
			if (!user) return;
			const q = query(
				collection(getFirestore(), await firebaseUtils.getUserZipCode()),
				orderBy('timestamp', 'desc')
			);
			onSnapshot(q, (snapshot) => {
				setPosts(
					snapshot.docs.map((doc) => {
						let data = doc.data();
						return (
							<Post
								key={data.timestamp}
								title={data.title}
								author={data.authorUsername}
								content={data.content}
								likes={data.likes.length}
								dislikes={data.dislikes.length}
								comments={data.comments}
								id={doc.id}
								liked={data.likes.includes(user.uid)}
								disliked={data.dislikes.includes(user.uid)}
								imageURL={data.imageURL}
							/>
						);
					})
				);
			});
		}

		updatePosts();
	});

	return <div>{posts}</div>;
}
