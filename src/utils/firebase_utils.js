import { getAuth } from '@firebase/auth';
import { getFirestore, collection, doc, getDoc, addDoc, serverTimestamp } from '@firebase/firestore';

function getLoggedInUser() {
	return getAuth().currentUser;
}

async function getUserZipCode() {
	const userDoc = doc(getFirestore(), 'users', getLoggedInUser().uid);
	return (await getDoc(userDoc)).data().zipCode;
}

async function uploadPost(title, post) {
	let user = getLoggedInUser();
	if (!user) return;
	let zipCode = await getUserZipCode();
	addDoc(collection(getFirestore(), zipCode), {
		title: title,
		content: post,
		author: user.uid,
		authorUsername: user.displayName,
		likes: 0,
		comments: [],
		timestamp: serverTimestamp(),
	}).catch((error) => console.log(error));
}

async function getPost(postID) {
	const zipCode = await getUserZipCode();
	const postDoc = doc(getFirestore(), zipCode, postID);
	return (await getDoc(postDoc)).data();
}

let firebaseUtils = {
	getLoggedInUser: getLoggedInUser,
	getUserZipCode: getUserZipCode,
	uploadPost: uploadPost,
	getPost: getPost,
};

export default firebaseUtils;
