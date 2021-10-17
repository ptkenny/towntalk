import React from 'react';

export default function CommentSection(props) {
	return (
		<>
			{props.comments.map((comment) => (
				<div key={comment.timestamp}>
					<p key={comment.timestamp}>
						{comment.content} - {comment.authorUsername}
					</p>
					<hr />
				</div>
			))}
		</>
	);
}
