import React from 'react';
import { Form, Button } from 'react-bootstrap';
import firebaseUtils from '../utils/firebase_utils';

export default function PostCreator(props) {
	let [title, setTitle] = React.useState('');
	let [post, setPost] = React.useState('');

	let submitPost = async () => {
		await firebaseUtils.uploadPost(title, post);
	};

	return (
		<Form>
			<Form.Group>
				<Form.Label>Post Title</Form.Label>
				<Form.Control type="text" onChange={(e) => setTitle(e.target.value)} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Post Details</Form.Label>
				<Form.Control as="textarea" rows={3} onChange={(e) => setPost(e.target.value)} />
			</Form.Group>
			<Button variant="secondary" className="w-100 my-3" onClick={submitPost}>
				Post!
			</Button>
		</Form>
	);
}
