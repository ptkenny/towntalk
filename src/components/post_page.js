import { getAuth, onAuthStateChanged } from '@firebase/auth';
import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { withRouter } from 'react-router';
import firebaseUtils from '../utils/firebase_utils';

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = { post: {} };
	}

	componentDidMount() {
		const id = this.props.match.params.postID;
		async function getPostInformation() {
			onAuthStateChanged(getAuth(), async (user) => {
				if (user) {
					this.setState({ post: await firebaseUtils.getPost(id) });
				}
			});
		}
		getPostInformation.bind(this)();
	}

	render() {
		return (
			<Container fluid>
				<Card>
					<Card.Body>
						<Card.Title>{this.state.post.title}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">{this.state.post.authorUsername}</Card.Subtitle>
						<Card.Text>{this.state.post.content}</Card.Text>
					</Card.Body>
				</Card>
			</Container>
		);
	}
}

export default withRouter(Post);
