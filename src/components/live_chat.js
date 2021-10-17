import React from 'react';

export default function LiveChat(props) {
	let [message, setMessage] = React.useState('');
	let [allMessages, setAllMessages] = React.useState([]);

	React.useEffect(() => {
		async function getMessages() {
			const user = firebaseUtils.getLoggedInUser();
			if (!user) return;
			const q = query(
				collection(getFirestore(), await firebaseUtils.getUserZipCode()),
				orderBy('timestamp', 'desc')
			);
			onSnapshot(q, (snapshot) => {
				setAllMessages();
			});
		}
	});

	return;
}
