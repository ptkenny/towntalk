import React from 'react';
import { Form, Button } from 'react-bootstrap';
import firebaseUtils from '../utils/firebase_utils';

export default function PostCreator(props) {
	let [title, setTitle] = React.useState('');
	let [post, setPost] = React.useState('');
	let [image, setImage] = React.useState(null);

	let submitPost = async () => {
		let url = '';
		if (image) {
			url = await firebaseUtils.uploadImage(image);
		}

		await firebaseUtils.uploadPost(title, post, url);
		setTitle('');
		setPost('');
	};

	return (
		<Form>
			<Form.Group>
				<Form.Label>Post Title</Form.Label>
				<Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Post Details</Form.Label>
				<Form.Control as="textarea" rows={3} value={post} onChange={(e) => setPost(e.target.value)} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Post Image</Form.Label>
				<Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
			</Form.Group>
			<Button variant="success" className="w-100 my-3" onClick={submitPost}>
				Post!
			</Button>
		</Form>
	);
}
