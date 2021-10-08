import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { collection, query, onSnapshot, getFirestore } from 'firebase/firestore';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { BsChatLeft } from 'react-icons/bs';
import firebaseUtils from '../utils/firebase_utils';

function Post(props) {
	function likePost() {
		firebaseUtils.likePost(props.id);
	}

	function dislikePost() {
		firebaseUtils.dislikePost(props.id);
	}

	return (
		<Container fluid>
			<Card>
				<Card.Body>
					<Card.Title>{props.title}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">{props.author}</Card.Subtitle>
					<Card.Text>{props.content}</Card.Text>
				</Card.Body>
				<Card.Footer>
					<a onClick={likePost}>
						<FaRegThumbsUp /> {props.likes}
					</a>
					<a onClick={dislikePost}>
						<FaRegThumbsDown className="ms-5" /> {props.dislikes}
					</a>
					<BsChatLeft className="ms-5" /> {props.comments}
				</Card.Footer>
			</Card>
		</Container>
	);
}

export default function RecentPosts(props) {
	let [posts, setPosts] = React.useState([]);

	React.useEffect(() => {
		async function updatePosts() {
			const q = query(collection(getFirestore(), await firebaseUtils.getUserZipCode()));
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
								comments={data.comments.length}
								id={doc.id}
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
