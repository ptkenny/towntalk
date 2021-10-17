import React from 'react';
import { Card, Container, Modal, Form, Button, Image } from 'react-bootstrap';
import { FaRegThumbsUp, FaRegThumbsDown, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { BsChatLeft } from 'react-icons/bs';
import firebaseUtils from '../utils/firebase_utils';
import '../style.css';
import CommentSection from './comment_section';

export default function Post(props) {
	let [showImageModal, setShowImageModal] = React.useState(false);
	let [showComments, setShowComments] = React.useState(false);
	let [comment, setComment] = React.useState('');

	let handleOpenComments = () => setShowComments(true);
	let handleCloseComments = () => setShowComments(false);

	function likePost() {
		firebaseUtils.likePost(props.id);
	}

	function dislikePost() {
		firebaseUtils.dislikePost(props.id);
	}

	function postComment() {
		firebaseUtils.uploadComment(props.id, comment);
		setComment('');
	}

	return (
		<Container fluid>
			<Card bg="dark" text="white">
				<Card.Body>
					<Card.Title>{props.title}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">{props.author}</Card.Subtitle>
					<Card.Text>{props.content}</Card.Text>
					{props.imageURL !== '' && (
						<Card.Img
							onClick={(e) => setShowImageModal(true)}
							src={props.imageURL}
							style={{ maxWidth: '20vw', maxHeight: '20vh' }}
						/>
					)}
				</Card.Body>
				<Card.Footer>
					{props.liked ? <FaThumbsUp /> : <FaRegThumbsUp onClick={likePost} />} {props.likes}
					{props.disliked ? (
						<FaThumbsDown className="ms-5" />
					) : (
						<FaRegThumbsDown className="ms-5" onClick={dislikePost} />
					)}{' '}
					{props.dislikes}
					<BsChatLeft className="ms-5" onClick={handleOpenComments} /> {props.comments.length}
					<Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
						<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
							<Image src={props.imageURL} style={{ maxWidth: '20vw', maxHeight: '20vh' }} />
						</div>
					</Modal>
					<Modal
						scrollable={true}
						contentClassName="modal-dialog"
						show={showComments}
						onHide={handleCloseComments}
					>
						<Modal.Header closeButton>{props.content}</Modal.Header>
						<Modal.Body>
							<CommentSection comments={props.comments} />
						</Modal.Body>
						<Modal.Footer>
							<Form.Control
								type="text"
								value={comment}
								placeholder="Comment"
								onChange={(e) => setComment(e.target.value)}
							/>
							<Button variant="primary" onClick={postComment}>
								Post Comment
							</Button>
						</Modal.Footer>
					</Modal>
				</Card.Footer>
			</Card>
		</Container>
	);
}
